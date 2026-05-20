import { toDocument } from './to-document';

export const contactEducationDocuments = [
  toDocument(
    'contact-info',
    `Thai Nguyen. Phone: 404-309-4421. Email: thainguy271@gmail.com. Discord: @mogi. Hometown: Woodstock, GA. Current \
    location: Athens, GA. Open to relocation; prefers Atlanta or major GA cities. \
    LinkedIn: linkedin.com/in/thai-tam-minh-nguyen. GitHub: github.com/ttn64681.`,
    { title: 'Contact Information', category: 'contact' },
  ),
  toDocument(
    'education-uga',
    `Thai is pursuing a B.S. in Computer Science at the University of Georgia (Athens, GA), graduating May 2026. He \
    holds a 3.76 / 4.0 major GPA (3.34 / 4.0 cumulative). Relevant coursework includes Data Structures, Algorithms, \
    Software Engineering, Full-Stack Development, OOP, Data Science/ML, GenAI, Deep Learning, Computer Architecture, \
    Computer Graphics, and Systems Programming. He also completed UGA's Arch Ready career readiness certification.`,
    { title: 'University of Georgia - BS Computer Science', category: 'education' },
  ),
];
