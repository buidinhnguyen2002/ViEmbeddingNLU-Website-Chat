import "./DocumentViewer.scss"
import document from "../../assets/images/word.png";
import pdf from "../../assets/images/pdf.png";
import bot from "../../assets/images/bot.png";
import txt from "../../assets/images/txt.png";

import {useEffect, useState} from "react";
export default function DocumentViewer({chats}) {
    const [dropdownStates, setDropdownStates] = useState({});
    const [filesContext, setFilesContext] = useState({});
    useEffect(() => {
        if(chats.length > 0 )setFilesContext(groupChunksByFileAndKnowledge(chats[chats.length - 1].question.chunks));
    }, [chats]);
    const getFileImage = (fileType) => {
        if(fileType == "docx") return document;
        if(fileType == "pdf") return pdf;
        return txt;
    }
    const groupChunksByFileAndKnowledge = (chunks) => {
        const groupedChunks = {};
        chunks.forEach((chunk) => {
            const key = `${chunk.file_name}-${chunk.knowledge_name}`;
            if (!groupedChunks[key]) {
                groupedChunks[key] = [];
            }
            groupedChunks[key].push(chunk);
        });
        return groupedChunks;
    };
    const toggleDropdown = (id) => {
        setDropdownStates((prevState) => ({
            ...prevState,
            [id]: !prevState[id],
        }));
    };
    return (
        <div className={"chat_area"}>
            <div className="chat_area__title">
                <span>Document viewer</span>
            </div>
            <div className="chat_area__message document_viewer">
                <div className="document_viewer__body">
                    <div className="header_tag">
                        <img src={bot} alt=""/>
                        <span className={""}>Context Used</span>
                    </div>
                    <div className="context_used__container">
                        <div className="context">
                            {Object.keys(filesContext).map((key, index)=>{
                                const chunk = filesContext[key][0];
                                return <div key={index}>
                                    <div  className="document_viewer__header">
                                        <div className="document_relate__container">
                                            <div className="document_relate">
                                                <div className="document_relate__image">
                                                    <img src={getFileImage(chunk.file_type)} alt=""/>
                                                </div>
                                                <div className="document_relate__info">
                                                    <span className="title">{chunk.file_name}</span>
                                                    <span className="sub_content">
                                                        from knowledge {chunk.knowledge_name}
                                                    </span>
                                                </div>
                                                <div title={"Show detail chunks"} onClick={() => toggleDropdown(index)} className="btn_show">
                                                    <span><i className="bi bi-caret-down-fill"></i></span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {dropdownStates[index] && (
                                        <div className="dropdown-content">
                                            {filesContext[key].map((chunk, chunkIndex)=>{
                                               return <p key={chunk.chunk_id} className="chunk">{chunk.chunks}</p>
                                            })}
                                        </div>
                                    )}
                                </div>

                            })}
                            {/*    {filesContext.map((_, index) => (*/}
                            {/*    <div key={index}>*/}
                            {/*        <div  className="document_viewer__header">*/}
                            {/*            <div className="document_relate__container">*/}
                            {/*                <div className="document_relate">*/}
                            {/*                    <div className="document_relate__image">*/}
                            {/*                        <img src={document} alt=""/>*/}
                            {/*                    </div>*/}
                            {/*                    <div className="document_relate__info">*/}
                            {/*                        <span className="title">This is file.docs</span>*/}
                            {/*                        <span className="sub_content">*/}
                            {/*                            from Knowledge*/}
                            {/*                        </span>*/}
                            {/*                    </div>*/}
                            {/*                    <div title={"Show detail chunks"} onClick={() => toggleDropdown(index)} className="btn_show">*/}
                            {/*                        <span><i className="bi bi-caret-down-fill"></i></span>*/}
                            {/*                    </div>*/}
                            {/*                </div>*/}
                            {/*            </div>*/}
                            {/*        </div>*/}
                            {/*        {dropdownStates[index] && (*/}
                            {/*            <div className="dropdown-content">*/}
                            {/*                <p className="chunk">This is the dropdown content {index + 1}!</p>*/}
                            {/*                <p className="chunk">It will be hidden or shown based on the button click.</p>*/}
                            {/*            </div>*/}
                            {/*        )}*/}
                            {/*    </div>*/}
                            {/*))}*/}
                        </div>
                        {/*<p className="context">Cấu trúc nội dung của một đoạn văn đòi hỏi sự sắp xếp và liên kết hợp lý giữa ý chính và các ý bộ phận. Ý chính là mục tiêu chính mà tác giả muốn truyền đạt trong đoạn văn, và các ý bộ phận được sử dụng để trình bày và chứng minh ý chính đó.*/}

                        {/*    Ý chính thường được diễn đạt bằng một câu chủ đề, có thể là câu đầu tiên trong đoạn văn hoặc một câu nằm trong đoạn. Ý chính cũng có thể được tạo nên từ nhiều câu trong đoạn, khi ý chính không được hiển ngôn rõ ràng mà phải suy luận từ các ý bộ phận.*/}

                        {/*    Các ý bộ phận là các thành phần chi tiết trong đoạn văn, có nhiệm vụ trình bày, giải thích và chứng minh ý chính. Các ý bộ phận phải được xác lập và trình bày một cách mạch lạc, logic và có liên kết với nhau. Chúng cung cấp thông tin, ví dụ, lập luận hoặc sự phân tích để hỗ trợ ý chính và làm cho đoạn văn trở nên thuyết phục.*/}

                        {/*    Trong quá trình viết, tác giả cần tìm hiểu và xác định ý chính của mình và sau đó phân tích và tổ chức các ý bộ phận phù hợp. Việc sắp xếp các ý bộ phận trong đoạn văn phải tuân thủ một trình tự logic và hợp lý, từ những ý bộ phận cơ bản đến những ý bộ phận chi tiết hơn.*/}

                        {/*    Tóm lại, cấu trúc nội dung của một đoạn văn bao gồm ý chính và các ý bộ phận. Ý chính là mục tiêu chính của đoạn văn, trong khi các ý bộ phận là các thành phần chi tiết hỗ trợ ý chính. Qua việc sắp xếp và liên kết hợp lý giữa ý chính và các ý bộ phận, đoạn văn trở nên rõ ràng, logic và thuyết phục.*/}

                        {/*    Cấu trúc hình thức*/}

                        {/*    Cấu trúc hình thức là một yếu tố quan trọng trong việc tổ chức và trình bày đoạn văn. Nó bao gồm cả bố cục và ngôn ngữ được sử dụng trong việc xây dựng đoạn văn.*/}

                        {/*    Về bố cục, đoạn văn trong dạng lí tưởng được chia thành ba phần chính: phần mở đoạn (M), phần triển khai đoạn (a), và phần kết đoạn (K). Phần triển khai đoạn (a) luôn có mặt trong mỗi đoạn văn, dù là một đoạn tối giản chỉ gồm một câu. Tuy nhiên, phần mở đoạn (M) và phần kết đoạn (K) có thể có hoặc không, tùy thuộc vào cách tác giả muốn trình bày và tổ chức nội dung của mình.*/}

                        {/*    Phần mở đoạn (M) thường đặt ở đầu đoạn văn và có nhiệm vụ giới thiệu chủ đề hoặc ý chính của đoạn. Nó có thể giới thiệu ngắn gọn các thông tin cần thiết để đưa người đọc vào bối cảnh hoặc tạo ra sự gợi mở và thu hút từ đầu đoạn.*/}

                        {/*    Phần triển khai đoạn (a) là trung tâm của đoạn văn, nơi các ý bộ phận được trình bày và phát triển. Đây là phần quan trọng nhất trong việc truyền đạt thông tin, lập luận và ý kiến của tác giả. Phần này có thể bao gồm nhiều câu và các ý bộ phận được sắp xếp một cách mạch lạc và logic.*/}

                        {/*    Phần kết đoạn (K) đưa ra sự tổng kết hoặc kết luận của đoạn văn. Nó có thể tóm lược lại ý chính, đưa ra một quan điểm cuối cùng hoặc mở ra những suy nghĩ tiếp theo. Tuy nhiên, không phải đoạn văn nào cũng cần phải có phần kết đoạn (K), đặc biệt là trong các đoạn văn ngắn hoặc trong trường hợp ý chính đã được diễn đạt rõ ràng trong phần triển khai đoạn (a).*/}

                        {/*    Về ngôn ngữ, đoạn văn sử dụng các đơn vị ngôn ngữ như từ và câu để truyền đạt nội dung. Từ và câu được lựa chọn một cách cẩn thận để truyền tải ý nghĩa chính xác và mạch lạc. Các phương tiện liên kết như từ nối, từ chỉ hướng hoặc các cấu trúc ngữ pháp được sử dụng để tạo sự liên kết và mạch lạc giữa các ý bộ phận, từ đó tạo nên một đoạn văn có sự thống nhất và logic.*/}

                        {/*    Tóm lại, cấu trúc hình thức của một đoạn văn bao gồm bố cục và ngôn ngữ. Bố cục bao gồm phần mở đoạn (M), phần triển khai đoạn (a) và phần kết đoạn (K), trong đó phần triển khai đoạn (a) là trọng tâm. Ngôn ngữ được sử dụng để sắp xếp và kết nối các đơn vị ngôn ngữ như từ và câu, thông qua các phương tiện liên kết, để tường minh và truyền đạt nội dung một cách chính xác và mạch lạc.</p>*/}
                    </div>
                </div>
            </div>
        </div>
    )
}