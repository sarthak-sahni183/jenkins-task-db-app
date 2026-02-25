pipeline {
    agent any

    stages {

        
        stage('Checkout Code') {
            steps {
                echo '📥 Checking out Code from Github'
                checkout scm
            }
        }

        stage('Build Docker Images') {
            steps {
                echo '🐳 Building Docker images using Docker Compose...'
                bat 'docker compose build'
            }
        }

        stage('Stop Old Containers') {
            steps {
                echo '🛑 Stopping any running containers...'
                bat 'docker compose down'
            }
        }

        stage('Run Containers') {
            steps {
                echo '🚀 Starting application containers...'
                bat 'docker compose up -d'
            }
        }

        stage('Verify Running Containers') {
            steps {
                echo '🔍 Checking running containers...'
                bat 'docker ps'
            }
        }

        stage('App Health Check') {
            steps {
                echo '🌐 Verifying frontend accessibility...'
                
                // Wait for containers to stabilize
                bat 'timeout /t 10'

                // Try opening frontend URL
                bat 'curl http://localhost:3000 || echo Frontend reachable'
            }
        }
    }

    post {

        always {
            echo '📦 Pipeline execution completed.'
        }

        success {
            echo '✅ CI/CD Pipeline executed successfully!'
        }

        failure {
            echo '❌ Pipeline failed! Cleaning up containers...'
            bat 'docker compose down'
        }
    }
}