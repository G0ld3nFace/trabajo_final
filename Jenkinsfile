pipeline {
    agent any 
    environment {
        USERNAME = 'Pedro Obreque Roa'
        APIKEY = 'Alohomora'
    }
        stages {
            stage('Instalar dependencias') {
                agent {
                    docker {
                        label 'Creacion de contenedor'
                        image 'node:22-alpine'
                        reuseNode true
                    }
                }
                stages {
                    stage('Instalar dependencias') {
                        steps {
                            sh 'npm install'
                        }
                    }
                    stage('Ejecucion de pruebas') {
                        steps {
                            sh 'npm run test'
                        }
                    }
                    stage('Build') {
                        steps {
                            sh 'npm run build'
                        }
                    }
                }
            }
            stage('Upload de Informe a sonarqube de calidad') {
                steps {
                    echo 'Upload de Informe a sonarqube de calidad'
                }
            }
            stage('Validación de puerta de calidad con sonarqube') {
                steps {
                    echo 'Validación de puerta de calidad con sonarqube'
                }
            }
            stage('Construcción de imagen docker') {
                steps {
                    sh 'docker build -t backend-devops .'
                }
            }
            stage('Upload de imagen al registry de nexus actualizada con tag latest') {
                steps {
                    script {
                        docker.withRegistry('http://localhost:8082', 'registry') {
                            sh 'docker tag backend-devops:latest localhost:8082/backend-devops:latest'
                            sh 'docker push localhost:8082/backend-devops:latest'
                        }
                    }                    
                }
            }
            stage('Upload de imagen al registry de nexus actualizada con tag igual a build number de jenkins') {
                steps {
                    echo 'Upload de imagen al registry de nexus actualizada con tag igual a build number de jenkins'
                }
            }
        }
        
    
}