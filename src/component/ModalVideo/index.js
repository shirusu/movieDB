import React,{useState} from 'react';
import ModalVideo from 'react-modal-video'

const TrailerVideo = ({id}) => {
    const [isOpen, setIsOpen] = useState(false)
    return (
        <>
            <ModalVideo channel='youtube' autoplay isOpen={isOpen} videoId={id} onClose={() => setIsOpen(false)} />
            <button className="btn-primary mx-1 my-2" onClick={()=> setIsOpen(true)}>View Trailer</button>
        </>
    );
};

export default TrailerVideo;