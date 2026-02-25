pipeline {
    agent any

    stages {

        stage('Checkout Code') {
            steps {
                echo '📥 Fetching code from GitHub...'
                checkout scm
            }
        }

        stage('Build Docker Images') {
            steps {
                echo '🐳 Building Docker images...'
                bat 'docker compose build'
            }
        }

        stage('Stop Old Containers') {
            steps {
                echo '🛑 Stopping old containers...'
                bat 'docker compose down'
            }
        }

        stage('Deploy Containers') {
            steps {
                echo '🚀 Starting containers...'
                bat 'docker compose up -d'
            }
        }

        stage('Verify Running Containers') {
            steps {
                echo '🔍 Checking containers...'
                bat 'docker ps'
            }
        }

        stage('App Health Check') {
            steps {
                echo '🌐 Verifying app accessibility...'

                // Wait for app startup
                bat 'ping 127.0.0.1 -n 10 > nul'

                // Hit frontend
                bat 'curl http://localhost:3000'
            }
        }
    }

    post {

        success {
            echo '✅ CI/CD Pipeline executed successfully!'
        }

        failure {
            echo '❌ Pipeline failed!'
        }

        always {
            echo '📦 Pipeline execution finished.'
        }
    }
}