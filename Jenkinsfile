pipeline {
    agent none

    stages {
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