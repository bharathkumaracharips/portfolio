import { CardBody, CardContainer, CardItem } from "@/app/components/ui/3d-card";
import Image, { StaticImageData } from "next/image";
import { motion } from "framer-motion";
import alchemyImage from './media/alchemy certificate.png';
import EthicalHacking from "./media/EthicalHacking.png";
import azurecp from './media/azure.png';
import internship from './media/internship.png';
import rustCertificate from './media/rust_polkadot.png';

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

const CertificateCard = ({ 
  title, 
  description, 
  image, 
  alt 
}: { 
  title: string; 
  description: string; 
  image: StaticImageData; 
  alt: string; 
}) => (
  <motion.div
    variants={cardVariants}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, margin: "-100px" }}
  >
    <CardContainer className="inter-var">
      <CardBody className="glass-effect dark:glass-effect relative group/card hover:shadow-2xl hover:shadow-blue-500/[0.1] dark:hover:shadow-purple-500/[0.1] border border-white/10 dark:border-white/5 w-[280px] sm:w-[340px] md:w-[400px] lg:w-[480px] h-auto rounded-xl p-4 sm:p-6 backdrop-blur-sm transition-all duration-500 hover:backdrop-blur-md hover:border-white/20 dark:hover:border-white/10">
        <CardItem 
          translateZ="50" 
          className="text-base sm:text-lg md:text-xl font-bold text-neutral-800 dark:text-white bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
        >
          {title}
        </CardItem>
        <CardItem 
          as="p" 
          translateZ="60" 
          className="text-xs sm:text-sm max-w-sm mt-2 text-neutral-600 dark:text-neutral-300 leading-relaxed"
        >
          {description}
        </CardItem>
        <CardItem translateZ="100" className="w-full mt-4">
          <motion.div
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
            className="relative overflow-hidden rounded-xl"
          >
            <Image
              src={image}
              height="1000"
              width="1000"
              className="h-auto w-full object-cover rounded-xl group-hover/card:shadow-xl transition-all duration-300 hover:brightness-110"
              alt={alt}
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 rounded-xl" />
          </motion.div>
        </CardItem>
        
        {/* Glow effect */}
        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 pointer-events-none" />
      </CardBody>
    </CardContainer>
  </motion.div>
);

export function EVMCard() {
  return (
    <CertificateCard
      title="EVM Chain Certification"
      description="The EVM Chain Certificate from Alchemy University - Comprehensive blockchain development certification"
      image={alchemyImage}
      alt="EVM Chain Certification from Alchemy University"
    />
  );
}

export function EthicalHackingCard() {
  return (
    <CertificateCard
      title="Ethical Hacking"
      description="The Ethical Hacking Course Offered by IIT Kharagpur - Advanced cybersecurity and penetration testing"
      image={EthicalHacking}
      alt="Ethical Hacking Certificate from IIT Kharagpur"
    />
  );
}

export function CloudPractitionerCard() {
  return (
    <CertificateCard
      title="Cloud Practitioner"
      description="The Cloud Practitioner certification by Microsoft Azure - Cloud computing fundamentals and services"
      image={azurecp}
      alt="Microsoft Azure Cloud Practitioner Certificate"
    />
  );
}

export function InternshipCard() {
  return (
    <CertificateCard
      title="Internship"
      description="Internship Certificate Offered by Shamgar Software Solutions - Professional software development experience"
      image={internship}
      alt="Internship Certificate from Shamgar Software Solutions"
    />
  );
}

export function RustCard() {
  return (
    <CertificateCard
      title="Rust Polkadot"
      description="Rust Polkadot Course - Advanced blockchain development with Rust and Substrate framework"
      image={rustCertificate}
      alt="Rust Polkadot Development Certificate"
    />
  );
}
