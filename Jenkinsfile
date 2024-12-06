pipeline {
    agent any 
        stages {
            stage("Instalar dependencias") {
                steps {
                    echo "Instalar dependencias"
                }
            }
            stage("Testing") {
                steps {
                    echo "Testing"
                }
            }
            stage("Build") {
                steps {
                    echo "Build"
                }
            }
            stage("Upload de Informe a sonarqube de calidad") {
                steps {
                    echo "Upload de Informe a sonarqube de calidad"
                }
            }
            stage("Validación de puerta de calidad con sonarqube") {
                steps {
                    echo "Validación de puerta de calidad con sonarqube"
                }
            }
            stage("Construcción de imagen docker") {
                steps {
                    echo "Construcción de imagen docker"
                }
            }
            stage("Upload de imagen al registry de nexus actualizada con tag latest") {
                steps {
                    echo "Upload de imagen al registry de nexus actualizada con tag latest"
                }
            }
            stage("Upload de imagen al registry de nexus actualizada con tag igual a build number de jenkins") {
                steps {
                    echo "Upload de imagen al registry de nexus actualizada con tag igual a build number de jenkins"
                }
            }
        }
        
    
}