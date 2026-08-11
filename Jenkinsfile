pipeline {
    agent none

    stages {

        stage('AWS Test') {
            agent any

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

        stage('ECR Test') {
            agent any

            steps {
                withCredentials([[
                    $class: 'AmazonWebServicesCredentialsBinding',
                    credentialsId: 'aws-sweetshop-ecr'
                ]]) {
                    sh '''
                        aws ecr describe-repositories \
                          --region eu-north-1 \
                          --repository-names sweetshop-backend sweetshop-frontend
                    '''
                }
            }
        }

        stage('Backend Build') {
            agent {
                docker {
                    image 'node:24-bookworm-slim'
                }
            }

            steps {
                dir('backend') {
                    sh 'npm ci'
                    sh 'npm run build'
                }
            }
        }

        stage('Frontend Build') {
            agent {
                docker {
                    image 'node:24-bookworm-slim'
                }
            }

            steps {
                dir('frontend') {
                    sh 'npm ci'
                    sh 'npm run build'
                }
            }
        }

        stage('Docker Build') {
            agent any

            steps {
                sh 'docker compose build'
            }
        }
    }
}