import './callBtn.css'


const CallBtn = ({ word }) => {

    if(word.split("").length !== 5){
        throw new Error('The word passed as props needs to be five (5) letters long')
    }

    return (
        <div className="button py-4">
            {word.split("").map((letter, index) => <div key={index} className="box">{letter.toUpperCase()}</div>)}
        </div>
    )
}

export default CallBtn
