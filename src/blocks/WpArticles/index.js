import WordPressBlogroll from "../WordPressBlogroll"

const WpArticles = ({ wp_data }) => {
    return (
        <div>
            <h3 className="text-lg uppercase font-semibold leading-normal mb-2 my-4">Articles</h3>
            <WordPressBlogroll wp_data={wp_data} />
        </div>
    )
}

export default WpArticles