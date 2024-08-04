import "./SelectedKnowledgeModal.scss"
import knowledge from "../../assets/images/dataset_text.png"
import {useState} from "react";
import {Link} from "react-router-dom";
export default function SelectedKnowledgeModal({toggleShowModal}) {
    const [knowledges, setKnowledges] = useState([1,2,3,4,5,6,7,8,9,10]);
    return (
        <div className="overlay">
            <div className="selected_knowledge__modal">
                <div className="modal__header">
                    <span className="modal__title">Select knowledge</span>
                    <div onClick={toggleShowModal} className="modal_btn_close">
                        <i className="bi bi-x-lg"></i>
                    </div>
                </div>
                <div className="modal__body">
                    <div className="knowledge__wrapper">
                        {knowledges.map((value, index)=><Link className={"link"} to={"/knowledge/knowledgeId"}> <div className="knowledge__container">
                            <div className="knowledge__container--left">
                                <div className="image__container">
                                    <img src={knowledge} alt=""/>
                                </div>
                                <div className="content__container">
                                    <span className="knowledge_title">This is title</span>
                                    <span className="knowledge_description">This is description</span>
                                    <div className="tags__container">
                                        <div className="tag"><span>1.9MB</span> </div>
                                        <div className="tag"><span>1 Data</span></div>
                                    </div>
                                    <span className="create_time">Create time: 31-8-2024</span>
                                </div>
                            </div>
                            <div className="knowledge__container--right">
                                <div className="btn_action btn_action--delete">
                                    <span>{value % 2 == 0 ? "Add": "Remove"} </span>
                                </div>
                            </div>
                        </div></Link>)}
                    </div>
                </div>
            </div>
        </div>
    )
}