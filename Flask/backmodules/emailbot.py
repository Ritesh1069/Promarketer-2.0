import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
import time

def emailexecute(email,content):
  fromEmail = "aiengineer108@gmail.com"
  subject = "PRO MARKETER "
  message = content
  sendMail(fromEmail, email, subject, message)
  return ("Mail sent to - "+email)
        
        
def sendMail(fromEmail, toEmail, subject, message):
  msg = MIMEMultipart()
  msg.set_unixfrom("harry")
  msg['From'] = fromEmail
  msg['To'] = toEmail
  msg['Subject'] = subject
  msg.attach(MIMEText(message))  
  mailserver = smtplib.SMTP_SSL('smtp.gmail.com', 465)
  mailserver.ehlo()
  mailserver.login('aiengineer108@gmail.com','ltbojiikjxhcucni')
  mailserver.sendmail(fromEmail, toEmail, msg.as_string())
  mailserver.quit()
  