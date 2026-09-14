import { toDocument } from './to-document';

export const contactEducationDocuments = [
  toDocument(
    'contact-info',
    `Thai (Tam Minh) Nguyen. Phone: (404) 309-4421. Email: thainguy271@gmail.com. Discord: @mogi. \
    Portfolio: thai-nguyen.vercel.app. Hometown: Woodstock, GA. Current location: Athens / Atlanta area, GA. \
    Open to relocation; prefers Atlanta or major GA cities. \
    LinkedIn: linkedin.com/in/thai-tam-minh-nguyen. GitHub: github.com/ttn64681.`,
    { title: 'Contact Information', category: 'contact' },
  ),
  toDocument(
    'education-uga',
    `Thai earned a B.S. in Computer Science from the University of Georgia School of Computing (Jun 2023 – Aug 2026). \
    Major GPA 3.78 / 4.0; cumulative GPA 3.37 / 4.0. Relevant coursework: Data Structures, Algorithms, Software Engineering, \
    Full-Stack Development, OOP, Data Science/ML, Deep Learning, Computer Networks, Computer Graphics, Computer Architecture, \
    and Systems Programming. He also completed UGA's Arch Ready career readiness certification.`,
    { title: 'University of Georgia - BS Computer Science', category: 'education' },
  ),
];
