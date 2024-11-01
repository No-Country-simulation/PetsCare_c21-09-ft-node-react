<img src="https://github.com/No-Country-simulation/PetsCare_c21-09-ft-node-react/blob/5319fe6dd30986283c05f0b3ac53c8fe6be0a19a/src/assets/dog.png" alt="Cuidado Peludo pets" width="120"/> 

# Cuidado Peludo 

<img src="https://github.com/No-Country-simulation/PetsCare_c21-09-ft-node-react/blob/5319fe6dd30986283c05f0b3ac53c8fe6be0a19a/src/assets/logo.png" alt="Cuidado Peludo Logo" width="80"/>

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

  <img src="https://github.com/No-Country-simulation/PetsCare_c21-09-ft-node-react/blob/cdf6599373fe7bed5c044d8f1746baad2d8513b0/src/assets/busquedaservicios.png" alt="Personalized search service" width="400"/>

- **Location Filter**: By entering their city or neighborhood, pet owners can find service providers nearby, ensuring convenience and accessibility.

  <img src="https://github.com/No-Country-simulation/PetsCare_c21-09-ft-node-react/blob/5319fe6dd30986283c05f0b3ac53c8fe6be0a19a/src/assets/filtroubicacion.png" alt="Location filer" width="400"/>
  
- **Service Listing with Reviews**: Each provider displays their profile with photos, service descriptions, prices, and reviews from other users, adding transparency and ease in comparing options.

  <img src="https://github.com/No-Country-simulation/PetsCare_c21-09-ft-node-react/blob/5319fe6dd30986283c05f0b3ac53c8fe6be0a19a/src/assets/opcionesprestadores.png" alt="Service Listing with Reviews" width="400"/>

- **Service Detail and Booking Options**: Users can view detailed service information and proceed to book or contact the provider, making the process smooth and straightforward.

  <img src="https://github.com/No-Country-simulation/PetsCare_c21-09-ft-node-react/blob/5319fe6dd30986283c05f0b3ac53c8fe6be0a19a/src/assets/detallesservicio.png" alt="Service Detail" width="400"/>
  
  <img src="https://github.com/No-Country-simulation/PetsCare_c21-09-ft-node-react/blob/5319fe6dd30986283c05f0b3ac53c8fe6be0a19a/src/assets/disponibilidadservicio.png" alt="Booking Options" width="400"/>

- **Interactive Map**: A map feature displays nearby providers, enhancing the efficiency of the search and allowing for better planning.

  <img src="https://github.com/No-Country-simulation/PetsCare_c21-09-ft-node-react/blob/5319fe6dd30986283c05f0b3ac53c8fe6be0a19a/src/assets/mapa.png" alt="Interactive map" width="400"/>

## Design Process
The design process involved multiple iterations in Figma. The platform was initially designed for desktop use but is fully responsive for other devices. You can view the design prototype on Figma [here](https://www.figma.com/proto/DvdKKnVCzvJcJ0WDmiPZYj/Proyecto-Cuidado-Peludo-1?node-id=2015-1029&node-type=canvas&t=tfgiYaMGA38A4cRl-1&scaling=min-zoom&content-scaling=fixed&page-id=2001%3A571&starting-point-node-id=2015%3A1029).

## Technical Stack
- **Frontend**: React and Tailwind CSS
- **Backend**: Spring Boot
- **Database**: MySQL, hosted on Docker
- **Version Control and CI/CD**: Git and GitHub for collaboration and versioning

## Team Organization
This project was developed as part of No Country's simulation program, which provides real-world experience to help people develop technical and interpersonal skills. Our team consisted of 11 members, with seven actively contributing to the project. We had frontend developers, backend developers, a UX designer, and a team leader.

We organized our work using sprints, with daily meetings to discuss progress, address blockers, and assign tasks. Our flexible schedule allowed us to adapt to individual availability, fostering a collaborative and supportive team environment.

## Installation and Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/yourusername/cuidado-peludo.git
   cd cuidado-peludo

2. **Backend Setup**:
- Ensure Docker is installed and running on your system. 
- Run MySQL on Docker:
   ```bash
   docker-compose up
- Start the backend server using Spring Boot (adjust configurations in application.properties as needed):
   ```bash
  ./mvnw spring-boot:run
  
3. **Frontend Setup**:
- Navigate to the client directory.
- Install dependencies:
   ```bash
   npm install

- Start the frontend server:
   ```bash
  npm run dev

4. **Database Configuration**:
- Ensure your database connection details match those in application.properties:
   ```bash
  spring.datasource.url=jdbc:mysql://localhost:3307/db_cuidadomascotas
  spring.datasource.username=root
  spring.datasource.password=admin
  
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

## Acknowledgements

This project was developed as part of No Country's Tech Simulation program. We appreciate the support and resources provided by No Country, which allowed us to gain hands-on experience in a real-world project.

**No Country**: [No Country Website](https://www.nocountry.tech) - Empowering Talent Without Experience

## License

This project is licensed under the MIT License.