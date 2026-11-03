pipeline {
    agent none

    environment {
        AWS_REGION = 'eu-north-1'
        ECR_BACKEND = 'sweetshop-backend'
        ECR_FRONTEND = 'sweetshop-frontend'
    }

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

        stage('Push Images to ECR') {
            agent any

            steps {
                withCredentials([[
                    $class: 'AmazonWebServicesCredentialsBinding',
                    credentialsId: 'aws-sweetshop-ecr'
                ]]) {
                    sh '''
                        set -e

                        echo "Getting AWS account ID..."
                        AWS_ACCOUNT_ID=$(aws sts get-caller-identity \
                            --query Account \
                            --output text)

                        ECR_REGISTRY="${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com"

                        echo "Logging in to ECR..."
                        aws ecr get-login-password \
                            --region "${AWS_REGION}" \
                            | docker login \
                                --username AWS \
                                --password-stdin "${ECR_REGISTRY}"

                        echo "Tagging backend image..."
                        docker tag \
                            sweetshop-backend:latest \
                            "${ECR_REGISTRY}/${ECR_BACKEND}:${BUILD_NUMBER}"

                        echo "Tagging frontend image..."
                        docker tag \
                            sweetshop-frontend:latest \
                            "${ECR_REGISTRY}/${ECR_FRONTEND}:${BUILD_NUMBER}"

                        echo "Pushing backend image..."
                        docker push \
                            "${ECR_REGISTRY}/${ECR_BACKEND}:${BUILD_NUMBER}"

                        echo "Pushing frontend image..."
                        docker push \
                            "${ECR_REGISTRY}/${ECR_FRONTEND}:${BUILD_NUMBER}"

                        echo "Images pushed successfully."
                    '''
                }
            }
        }
    }
}