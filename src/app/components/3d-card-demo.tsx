import { CardBody, CardContainer, CardItem } from "@/app/components/ui/3d-card";
import Image from "next/image";
import alchemyImage from '@/app/components/media/alchemy certificate.png';
import EthicalHacking from "@/app/components/media/EthicalHacking.png";
import azurecp from '@/app/components/media/azure.png'
import internship from '@/app/components/media/internship.png';

export function EVMCard() {
  return (
    <CardContainer className="inter-var">
      <CardBody className="bg-gray-50 relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-[280px] sm:w-[340px] md:w-[400px] lg:w-[500px] h-auto rounded-xl p-4 sm:p-6 border">
        <CardItem translateZ="50" className="text-base sm:text-lg md:text-xl font-bold text-neutral-600 dark:text-white">
          EVM Chain Certification
        </CardItem>
        <CardItem as="p" translateZ="60" className="text-xs sm:text-sm max-w-sm mt-2 dark:text-neutral-300">
          The EVM Chain Certificate from Alchemy University
        </CardItem>
        <CardItem translateZ="100" className="w-full mt-4">
          <Image
            src={alchemyImage}
            height="1000"
            width="1000"
            className="h-auto w-full object-cover rounded-xl group-hover/card:shadow-xl"
            alt="thumbnail"
          />
        </CardItem>
      </CardBody>
    </CardContainer>
  );
}

export function EthicalHackingCard() {
  return (
    <CardContainer className="inter-var">
      <CardBody className="bg-gray-50 relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-[280px] sm:w-[340px] md:w-[400px] lg:w-[500px] h-auto rounded-xl p-4 sm:p-6 border">
        <CardItem translateZ="50" className="text-base sm:text-lg md:text-xl font-bold text-neutral-600 dark:text-white">
          Ethical Hacking
        </CardItem>
        <CardItem as="p" translateZ="60" className="text-xs sm:text-sm max-w-sm mt-2 dark:text-neutral-300">
          The Ethical Hacking Course Offered by IIT Kharagpur
        </CardItem>
        <CardItem translateZ="100" className="w-full mt-4">
          <Image
            src={EthicalHacking}
            height="1000"
            width="1000"
            className="h-auto w-full object-cover rounded-xl group-hover/card:shadow-xl"
            alt="thumbnail"
          />
        </CardItem>
      </CardBody>
    </CardContainer>
  );
}

export function CloudPractitionerCard() {
  return (
    <CardContainer className="inter-var">
      <CardBody className="bg-gray-50 relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-[280px] sm:w-[340px] md:w-[400px] lg:w-[500px] h-auto rounded-xl p-4 sm:p-6 border">
        <CardItem translateZ="50" className="text-base sm:text-lg md:text-xl font-bold text-neutral-600 dark:text-white">
          Cloud Practitioner
        </CardItem>
        <CardItem as="p" translateZ="60" className="text-xs sm:text-sm max-w-sm mt-2 dark:text-neutral-300">
          The Cloud Practitioner certification by Microsoft Azure
        </CardItem>
        <CardItem translateZ="100" className="w-full mt-4">
          <Image
            src={azurecp}
            height="1000"
            width="1000"
            className="h-auto w-full object-cover rounded-xl group-hover/card:shadow-xl"
            alt="thumbnail"
          />
        </CardItem>
      </CardBody>
    </CardContainer>
  );
}

export function InternshipCard() {
  return (
    <CardContainer className="inter-var">
      <CardBody className="bg-gray-50 relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-[280px] sm:w-[340px] md:w-[400px] lg:w-[500px] h-auto rounded-xl p-4 sm:p-6 border">
        <CardItem translateZ="50" className="text-base sm:text-lg md:text-xl font-bold text-neutral-600 dark:text-white">
          Internship
        </CardItem>
        <CardItem as="p" translateZ="60" className="text-xs sm:text-sm max-w-sm mt-2 dark:text-neutral-300">
          Internship Certificate Offered by Shamgar Software Solutions
        </CardItem>
        <CardItem translateZ="100" className="w-full mt-4">
          <Image
            src={internship}
            height="1000"
            width="1000"
            className="h-auto w-full object-cover rounded-xl group-hover/card:shadow-xl"
            alt="thumbnail"
          />
        </CardItem>
      </CardBody>
    </CardContainer>
  );
}