pipeline {
    agent any {
        stages {
            stage("A") {
                steps {
                    echo "Instalar dependencias"
                }
            }
            stage("B") {
                steps {
                    echo "Testing"
                }
            }
            stage("C") {
                steps {
                    echo "Build"
                }
            }
            stage("D") {
                steps {
                    echo "Upload de Informe a sonarqube de calidad"
                }
            }
            stage("E") {
                steps {
                    echo "Validación de puerta de calidad con sonarqube"
                }
            }
            stage("F") {
                steps {
                    echo "Construcción de imagen docker"
                }
            }
            stage("G") {
                steps {
                    echo "Upload de imagen al registry de nexus actualizada con tag latest"
                }
            }
            stage("H") {
                steps {
                    echo "Upload de imagen al registry de nexus actualizada con tag igual a build number de jenkins"
                }
            }
        }
        
    }
}