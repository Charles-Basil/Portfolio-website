import emailjs from '@emailjs/browser';

export function initEmailJS() {

  emailjs.init('s2mP7Z6uPDqfGoPM1'); 
}

export function sendEmail(form) {
  const serviceID = 'service_mtphv3o'; 
  const templateID = 'template_tvjg05c'; 

  return emailjs.sendForm(serviceID, templateID, form);
}