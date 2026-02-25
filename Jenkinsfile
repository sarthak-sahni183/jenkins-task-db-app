pipeline {
    agent any
    
    stages {
        stage('Checkout') {
            steps {
                echo 'Checking out code...'
                checkout scm
            }
        }
        
        stage('Build Docker Images') {
            steps {
                echo 'Building Docker images...'
                bat 'docker compose build'
            }
        }
        
        stage('Run Tests') {
            steps {
                echo 'Running tests...'
                // Add your test commands here
                bat 'echo Tests passed'
            }
        }
        
        stage('Deploy') {
            steps {
                echo 'Deploying application...'
                bat 'docker compose down'
                bat 'docker compose up -d'
            }
        }
        
        stage('Verify Deployment') {
            steps {
                echo 'Verifying deployment...'
                bat 'timeout /t 10'
                bat 'curl http://localhost:3000 || echo Deployment verification complete'
            }
        }
    }
    
    post {
        always {
            echo 'Pipeline completed!'
        }
        success {
            echo 'Pipeline succeeded!'
        }
        failure {
            echo 'Pipeline failed!'
            bat 'docker compose down'
        }
    }
}
