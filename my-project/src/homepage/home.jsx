import javascriptLogo from "../assets/javascript.svg"
import reactLogo from "../assets/react.svg"
import javaLogo from "../assets/java.svg"
import csharpLogo from "../assets/csharp.svg"
import expressLogo from "../assets/expressjs.svg"

export default function Home() {
    return (
        <>
            <div className="min-h-screen flex flex-col items-center justify-center gap-4 p-10 bg-stone-800">
                <h1>Lu Hou</h1>
                <h2>Software Developer</h2>
                <div className="flex flex-row justify-center items-stretch gap-5">
                    <img src={javascriptLogo} alt="javascript logo" className="max-w-25" />
                    <img src={reactLogo} alt="react logo" className="max-w-25" />
                    <img src={expressLogo} alt="expressjs logo" className="max-w-25" />
                    <img src={javaLogo} alt="java logo" className="max-w-25" />
                    <img src={csharpLogo} alt="csharp logo" className="max-w-25" />
                </div>
                <a href="https://github.com/Lufford" target="_blank" className="text-blue-600 hover:text-blue-400">github</a>
                <div><a href="mailto:luyanghou@live.ca" className="text-blue-600 hover:text-blue-400">luyanghou@live.ca</a></div>
                <div>649-919-8404</div>
                <div>Toronto, Ontario</div>
            </div>   
        </>
    );
}