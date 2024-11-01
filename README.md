<table align="center">
  <tr>
    <td><img src="https://github.com/No-Country-simulation/PetsCare_c21-09-ft-node-react/blob/e050e2299fa314d164cf35e8a0e4aced148427a3/src/assets/logo.png" alt="Cuidado Peludo Logo" width="80"/></td>
    <td><h1>Cuidados <span style="color: rgb(52, 152, 219);">Peludos</span></h1></td>
    <td><img src="https://github.com/No-Country-simulation/PetsCare_c21-09-ft-node-react/blob/e050e2299fa314d164cf35e8a0e4aced148427a3/src/assets/dog.png" alt="Cuidado Peludo pets" width="80"/></td>
  </tr>
</table>

A platform designed to connect pet owners in Argentina with specialized pet care services, making it easier to find and book services such as dog walking, daycare, transport, veterinary care, training, and general pet care.

## Table of Contents
- [Introduction](#introduction)
- [Problem and Opportunity](#problem-and-opportunity)
- [Key Features](#key-features)
- [Design Process](#design-process)
- [Technical Stack](#technical-stack)
- [Team Organization](#team-organization)
- [Installation and Setup](#installation-and-setup)
- [Usage](#usage)
- [Future Enhancements](#future-enhancements)
- [Acknowledgements](#acknowledgements)
- [License](#license)

## Introduction
Argentina has one of the highest pet ownership rates in the world. Over 80% of households own at least one pet, primarily dogs, making pets an essential part of Argentine families. However, many pet owners face challenges in accessing quality services for their pets, such as walking, veterinary care, and boarding. **Cuidado Peludo** was created to address this gap by providing a centralized platform that connects pet owners with reliable and specialized service providers.

## Problem and Opportunity
With the significant number of pet-owning households in Argentina, there is a growing demand for quick, accessible, and trustworthy pet care services. Currently, there is no comprehensive solution to connect pet owners with a wide range of services in a simple and centralized manner.

**Cuidado Peludo** offers an opportunity to create an ecosystem where pet owners can access services like walking, daycare, transport, veterinary care, training, and other care services in one place. Leveraging the high adoption rate of pets in Argentina, this platform addresses a crucial need in a market that is still largely non-digital.

## Key Features

- **Personalized Service Search**: Users can choose the type of service needed (walking, daycare, transport, etc.) tailored to their pet's specific needs for fast and efficient searching.

  <div align="center">
    <img src="https://github.com/No-Country-simulation/PetsCare_c21-09-ft-node-react/blob/3d76af247adb3884935fad4de5bb5710068e2675/src/assets/busquedaservicios.png" alt="Personalized search service" width="800"/>
  </div>

- **Location Filter**: By entering their city or neighborhood, pet owners can find service providers nearby, ensuring convenience and accessibility.

  <div align="center">
    <img src="https://github.com/No-Country-simulation/PetsCare_c21-09-ft-node-react/blob/3d76af247adb3884935fad4de5bb5710068e2675/src/assets/filtroubicacion.png" alt="Location filter" width="800"/>
  </div>

- **Service Listing with Reviews**: Each provider displays their profile with photos, service descriptions, prices, and reviews from other users, adding transparency and ease in comparing options.

  <div align="center">
    <img src="https://github.com/No-Country-simulation/PetsCare_c21-09-ft-node-react/blob/3d76af247adb3884935fad4de5bb5710068e2675/src/assets/opcionesprestadores.png" alt="Service Listing with Reviews" width="800"/>
  </div>

- **Service Detail and Booking Options**: Users can view detailed service information and proceed to book or contact the provider, making the process smooth and straightforward.

  <div align="center">
    <img src="https://github.com/No-Country-simulation/PetsCare_c21-09-ft-node-react/blob/3d76af247adb3884935fad4de5bb5710068e2675/src/assets/detallesservicio.png" alt="Service Detail" width="800"/>
  </div>

  <div align="center">
    <img src="https://github.com/No-Country-simulation/PetsCare_c21-09-ft-node-react/blob/3d76af247adb3884935fad4de5bb5710068e2675/src/assets/disponibilidadservicio.png" alt="Booking Options" width="800"/>
  </div>

- **Interactive Map**: A map feature displays nearby providers, enhancing the efficiency of the search and allowing for better planning.

  <div align="center">
    <img src="https://github.com/No-Country-simulation/PetsCare_c21-09-ft-node-react/blob/3d76af247adb3884935fad4de5bb5710068e2675/src/assets/mapa.png" alt="Interactive map" width="800"/>
  </div>

## Design Process
The design process involved multiple iterations in Figma. The platform was initially designed for desktop use but is fully responsive for other devices. You can view the design prototype on Figma [here](https://www.figma.com/proto/DvdKKnVCzvJcJ0WDmiPZYj/Proyecto-Cuidado-Peludo-1?node-id=2015-1029&node-type=canvas&t=tfgiYaMGA38A4cRl-1&scaling=min-zoom&content-scaling=fixed&page-id=2001%3A571&starting-point-node-id=2015%3A1029).

## Technical Stack
- **Frontend**: React and Tailwind CSS
- **Backend**: Spring Boot
- **Database**: MySQL, hosted on Docker
- **Version Control and CI/CD**: Git and GitHub for collaboration and versioning

## Team Organization
This project was developed as part of No Country's simulation program, which provides real-world experience to help people develop technical and interpersonal skills. Our team consisted of 11 members, with seven actively contributing to the project. We had frontend developers, backend developers, a UX designer, and a team leader.

![Team Collaboration](https://github.com/No-Country-simulation/PetsCare_c21-09-ft-node-react/blob/df5eb3644f905fcc92e7ea42b7720ab76c44363f/src/assets/c21-09-ft-node-react%20Team%20-%20Cupe%20Background.jpg)

We organized our work using sprints, with daily meetings to discuss progress, address blockers, and assign tasks. Our flexible schedule allowed us to adapt to individual availability, fostering a collaborative and supportive team environment.

## Installation and Setup

### Project Installation Guide

Follow these steps to set up and run the project in your local environment:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/yourusername/cuidado-peludo.git
   cd cuidado-peludo
   
2. **Prerequisites**:

- **Java 17 LTS**: Ensure you have Java version 17 installed.
- **Maven**: Required for dependency management and building the Spring Boot project.
- **Node.js LTS**: Needed for package management and frontend tools.
- **Docker and Docker Compose**: For managing containers, including the MySQL database.

3. **Database Setup with Docker**:
- **Download the MySQL 8.4.0 image**:
   ```bash
   docker pull mysql:8.4.0

  - **Start the MySQL container**: Navigate to the project root, where the docker-compose.yml file is located, and run:
     ```bash
     docker-compose up -d
  
This will start the MySQL container in the background.

4. **Build and Run the Project**:
- **Backend (Spring Boot)**:
   ```bash
  mvn clean install
  mvn spring-boot:run
  
3. **Frontend Setup**:
- Navigate to the client directory.
- Install dependencies:
   ```bash
   npm install

- Start the frontend server:
   ```bash
  npm run dev

Ensure that all services are running and that database connection settings are correct.
  
## Usage

1. **Service Search**: Users can select their required service and enter their location to view available providers. 

2. **Service Details**: Each service provider has a dedicated page showing service details, prices, and customer reviews.

3. **Booking**: Users can book a service or contact the provider directly from the platform.

4. **Profile Management**: Users can manage their profiles, including adding pet information and viewing booking history.

## Future Enhancements

Some potential future improvements include:

- Adding in-app messaging between pet owners and service providers
- Enhancing the review system to include photos and more detailed feedback 
- Expanding the range of services to include grooming, pet training classes, and emergency care 
- Building a mobile application for iOS and Android

## Deployment Information
The deployment for testing was carried out on AWS using an EC2 t2.micro instance configured with Ubuntu 22.04. The setup included installing Java 17 and Nginx to serve the React project and connect via reverse proxy to the MySQL database, which was hosted using AWS RDS. An HTTPS certificate for the test domain was installed via Certbot.

## API Documentation

All endpoints can be accessed once the application is running on port 8080 via Swagger at the following URL:

[http://localhost:8080/swagger-ui/index.html](http://localhost:8080/swagger-ui/index.html)


## Acknowledgements

This project was developed as part of No Country's Tech Simulation program. We appreciate the support and resources provided by No Country, which allowed us to gain hands-on experience in a real-world project.

**No Country**: [No Country Website](https://www.nocountry.tech) - Empowering Talent Without Experience

## License

This project is licensed under the MIT License.