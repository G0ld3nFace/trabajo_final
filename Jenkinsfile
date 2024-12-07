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
            stage('QA contenerdor sonar-scanner-cli') {
                agent {
                    docker {
                        label 'sonar-scanner-cli'
                        image 'sonarsource/sonar-scanner-cli'
                        args '--network=devops-infra_default'
                        reuseNode true
                    }
                }
                stages {
                    stage('QA - Ejecucion sonar-scanner') {
                        steps {
                            withSonarQubeEnv('sonarqube') {
                                sh 'sonar-scanner'
                            }
                        }                        
                    }
                    stage('QA - puerta calidad 90%') {
                        steps {
                            script {
                                timeout(time:1, unit:'HOURS') {
                                    def qg = waitForQualityGate()
                                    if(qg.status != 'OK') {
                                        error "Pipeline aborted due to quality gate failure: ${qg.status}"
                                    }
                                }
                            }
                        }                        
                    }
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
                     script {
                        def version = "${BUILD_NUMBER}"
                        docker.withRegistry('http://localhost:8082', 'registry') {
                            sh """docker tag backend-devops:${version} localhost:8082/backend-devops:${version}"""
                            sh """docker push localhost:8082/backend-devops:${version}"""
                        }
                    } 
                }
            }
        }
        
    
}