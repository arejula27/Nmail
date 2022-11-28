import { MailData } from "../domain/mail";


export interface MailContentValues {
  subject: string;
  recipients: string;
  content: string;
}

  export function useMailUSeCases  () {

   

    const publishMail=(mail:MailContentValues)=>{console.log(mail)};
    
    const getMailList=():MailData[]=>{
      const fake:MailData= {
        id: "2",
        title: "Hola buenas tardes, que tal estas",
        sender: {
          name: "Kafka",
          imageUrl: "https://i.postimg.cc/QCWJKsmW/Dreadful-Rate226.png",
        },
        content: "Voluptate voluptate non ex culpa ipsum ex occaecat ea sit veniam et est pariatur. Commodo mollit est enim id reprehenderit elit sunt est elit id do. Tempor culpa cupidatat dolore dolor cupidatat proident adipisicing labore occaecat sit." +
        "\n" +
        "Voluptate voluptate non ex culpa ipsum ex occaecat ea sit veniam et est pariatur. Commodo mollit est enim id reprehenderit elit sunt est elit id do. Tempor culpa cupidatat dolore dolor cupidatat proident adipisicing labore occaecat sit." +
        "Consectetur voluptate nisi esse minim. Nostrud consectetur ex fugiat culpa cillum. Enim culpa veniam velit deserunt ex excepteur exercitation elit commodo sunt. Ea nostrud ea ex exercitation veniam. Sunt in laborum aute quis in pariatur esse. Officia ut quis officia consectetur duis.",
  
        date:"20/11/2022",
       
      }
      return[fake]
    }



    return {publishMail,getMailList}

    
   
  }