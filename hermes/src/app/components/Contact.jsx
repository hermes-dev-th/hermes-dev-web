import Page from "@/app/send/page"
const ContactList = [
    { title: 'Address', icon: './images/home-icon.png', content: '389/157 ต.แพรกษา อ.เมืองสมุทรปราการ จ.สมุทรปราการ 10280', id: 0 },
    { title: 'Phone', icon: './images/phone-icon.png', content: '061-239-9661', id: 1 },
    { title: 'Email', icon: './images/email-icon.png', content: 'hermes.software.dev@gmail.com', id: 2 }
]

export default function Contact() {
    return (
        <div className="flex flex-col justify-center items-center mb-[50vw] ">
            <h1 className="text-[3.5vw] font-bold">Contact Us</h1>
            <div className="flex justify-between items-center w-[70vw]">

                <div className="flex flex-col gap-[1vw] bg-black text-white rounded-[1vw] py-[4vw] pl-[3vw] pr-[5vw] mb-[3vw]">

                    {ContactList.map((contact) => {
                        return (
                            <div className="flex" key={contact.id}>
                                <img src={contact.icon} className="h-[1.5vw] w-[1.5vw] mt-[0.8vw] mr-[0.8vw]"></img>
                                <div className="flex flex-col w-[20vw]">
                                    <h2 className="text-[1.8vw] font-bold">{contact.title}</h2>
                                    <p className="text-[1vw] font-thin text-pretty">{contact.content}</p>
                                </div>
                            </div>
                        )
                    })}

                </div>

                <Page />



            </div>
        </div>
    );
}