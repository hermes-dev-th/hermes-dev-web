const ContactList = [
    { title: 'Address', icon: './images/home-icon.png', content: '389/157 ต.แพรกษา อ.เมืองสมุทรปราการ จ.สมุทรปราการ 10280' },
    { title: 'Phone', icon: './images/phone-icon.png', content: '061-239-9661' },
    { title: 'Email', icon: './images/email-icon.png', content: 'hermes.software.dev@gmail.com' }
]

export default function Contact() {
    return (
        <div className="flex flex-col justify-center items-center mb-[50vw]">
            <h1 className="text-[3.5vw] font-bold">Contact Us</h1>
            <div className="flex justify-between items-center mt-[3vw] w-[70vw] bg-blue-200">

                <div className="flex flex-col gap-[1vw] bg-black text-white rounded-[1vw] py-[4vw] pl-[3vw] pr-[5vw]">

                    {ContactList.map((contact) => {
                        return (
                            <div className="flex">
                        <img src={contact.icon} className="h-[1.5vw] w-[1.5vw] mt-[0.8vw] mr-[0.8vw]"></img>
                        <div className="flex flex-col w-[20vw]">
                            <h2 className="text-[1.8vw] font-bold">{contact.title}</h2>
                            <p className="text-[1vw] font-thin text-pretty">{contact.content}</p>
                        </div>
                    </div>
                    )})}
                    
                </div>

                <div className="bg-red-200 h-[10vw] w-[10vw] flex flex-col">

                </div>

            </div>
        </div>
    );
}