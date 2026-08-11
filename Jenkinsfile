pipeline {
    agent any

    stages {
        stage('AWS Test') {
            steps {
                withCredentials([[
                    $class: 'AmazonWebServicesCredentialsBinding',
                    credentialsId: 'aws-sweetshop-ecr'
                ]]) {
                    sh '''
                        aws sts get-caller-identity
                    '''
                }
            }
        }

        stage('Backend Build') {
            steps {
                dir('backend') {
                    sh 'npm ci'
                    sh 'npm run build'
                }
            }
        }

        stage('Frontend Build') {
            steps {
                dir('frontend') {
                    sh 'npm ci'
                    sh 'npm run build'
                }
            }
        }

        stage('Docker Build') {
            steps {
                sh 'docker compose build'
            }
        }
    }
}