
def labels = ['master','slave'] 
def builders = [:]
for (x in labels) {
    def label = x // Need to bind the label variable before the closure 

    // Create a map to pass in to the 'parallel' step so we can fire all the builds at once
    builders[label] = {
		timestamps {
			node () {
				
				def PROJECT="/home/ubuntu/Dev/glob"
				def PYTHON_P="$PROJECT/env/bin/python3.6"
				
				stage ('Checkout') {
					// checkout source control, need write permission to fetch all
					sh """ 
					whoami
					sudo service apache2 stop
					cd $PROJECT
					git fetch --all
					git reset --hard origin/master
					"""
				}

				stage ('Build') {
					
					sh """ 
					cd $PROJECT
					sudo chmod -R 770 $PROJECT
					sudo chown -R ubuntu:www-data $PROJECT
					npm install
					npm run build
					sudo rm -rf node_modules
					. env/bin/activate
					echo 'which python are you running?'
					which python
					pip install --upgrade pip setuptools wheel
					echo 'pip upgrade done'
					pip install -r requirements.txt
					echo 'pip install done'
					
					python manage.py migrate                  
					echo 'manage.py migrate done'

					#command not working
					#python manage.py compilemessages --settings=glob.settings

					python manage.py collectstatic --noinput --settings=glob.settings
					echo 'manage.py collectstatic done'

					python manage.py check --deploy

					deactivate 

					sudo service apache2 start

					""" 
				}
			}
		}
    }
}

throttle(['loadbalancer']) {
  parallel builders
}




