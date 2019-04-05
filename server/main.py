
import os
from flask import Flask, request, render_template, redirect, url_for
from werkzeug.utils import secure_filename
import util
import json

# get current app directory
dir_path = os.path.dirname(os.path.realpath(__file__))
UPLOAD_FOLDER = dir_path + '/data/'

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['_FILE'] = UPLOAD_FOLDER + 'NRDC_data.csv'
app.config['_META'] = UPLOAD_FOLDER + 'meta_data.txt'
app.config['_DATA_COLS'] = ""
app.config['_DATE_COL'] = ""
app.config['_QUAL'] = ""
app.config['_OUT'] = ""
app.config['META_FILE'] = UPLOAD_FOLDER + 'meta_data.txt'


@app.route('/' , methods=['POST', 'GET'])
def upload():
	if request.method == 'POST':
		# request.file <class 'werkzeug.datastructures.FileStorage'>
		# request.url is http://127.0.0.1:5000/
		# check if the post request has the file part
		if 'file' not in request.files:
			log = 'no file field in request.'
			return render_template('fail.html', log = log)
		# print(request.files['file'])
		file = request.files['file']
		# if user does not select file, browser also
		# submit an empty part without filename
		if file.filename == '':
			# This part should use flash to output information
			log = 'Empty filename.'
			return render_template('fail.html', log = log)
		if file and util.allowed_file(file.filename):
			# get filename in a safe way
			filename = secure_filename(file.filename)
			app.config['_FILE'] = UPLOAD_FOLDER + filename
			app.config['filename'] = filename
			print(filename)
			file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
			column_names, data_part = util.preview_csv(app.config['UPLOAD_FOLDER']+filename, 3)
			return render_template('upload2.html', column_names=column_names, data_part=data_part, filename=app.config['filename'])
	elif request.method == 'GET':
		app.config['_DATA_COLS'] = ""
		app.config['_DATE_COL'] = ""
		return render_template('upload.html')


@app.route('/upload2')
def upload2():
	column_names, data_part = util.preview_csv(app.config['_FILE'], 3)
	return render_template('upload2.html', column_names=column_names, data_part=data_part, filename=app.config['filename'])


@app.route('/verify')
def verify():
	column_names, data_part = util.preview_csv(app.config['_FILE'], 100)
	return render_template('verify.html', column_names=column_names, data_part=data_part, filename=app.config['filename'])

@app.route('/config')
def config():
	data_col_names = app.config['_DATA_COLS'].split(' ')
	print(data_col_names)
	return render_template('configure.html', data_col_names=data_col_names)

@app.route('/api/datacol/<colname>')
def apidata(colname):
	app.config['_DATA_COLS'] += colname + " "
	print(app.config['_DATA_COLS'])
	return ('', 204)


@app.route('/api/date/<colname>')
def apidate(colname):
	app.config['_DATE_COL'] = colname
	print(app.config['_DATE_COL'])
	return ('', 204)


@app.route('/runtests')
def runtests():
	return render_template('runtests.html')


@app.route('/review')
def review():
	return render_template('review.html', outlier=app.config["OUT"], qual=app.config["QUAL"], meta=app.config['_META'])


@app.route('/done')
def done():
	return render_template('done.html')


@app.route('/api/thresh/<col>/<high>/<low>')
def settest(col, high, low):
	qualified, outlier = util.threshold_process_method(app.config['_FILE'], col, float(low), float(high))
	print(qualified)
	print(outlier)
	app.config["QUAL"] = qualified
	app.config["OUT"] = outlier
	return render_template('runtests.html')


@app.route('/api/save', methods=['POST'])
def process_csv():
	input_values = request.form
	result_str = 'Lowest Value: ' + request.form['Lowest_Value'] + '\n' + \
				 'Highest Value:' + request.form['highest_value']
	text_file = open(app.config['META_FILE'], "w")
	text_file.write(result_str)
	text_file.close()

	return ('', 204)

if __name__ == '__main__':
    app.debug = True
    ip = '127.0.0.1'
    app.run(host=ip)