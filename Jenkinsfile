pipeline {
    agent any

    environment {
        REGISTRY = "registry.r-tulika.me"
        IMAGE_NAME = "elementar-rt"
        DOCKER_CREDENTIALS_ID = "docker-registry-credentials"
    }

    triggers {
        githubPush()
    }

    stages {
        stage('Build Docker Image') {
            steps {
                script {
                    dockerImage = docker.build("${REGISTRY}/${IMAGE_NAME}:${env.BUILD_NUMBER}")
                }
            }
        }

        stage('Push to Registry') {
            steps {
                script {
                    docker.withRegistry("https://${REGISTRY}", "${DOCKER_CREDENTIALS_ID}") {
                        dockerImage.push()
                        dockerImage.push("latest")
                    }
                }
            }
        }
    }

    post {
        always {
            cleanWs()
        }
        success {
            echo "✅ Build and push successful!"
        }
        failure {
            echo "❌ Build or push failed."
        }
    }
}
