import WordPressBlogroll from "../WordPressBlogroll"

const WpArticles = ({ wp_data }) => {
    return (
        <div>
            <h3 className="text-2xl font-semibold leading-normal mb-2 -700 mb-2">Articles</h3>
            <WordPressBlogroll wp_data={wp_data} />
            {/* {JSON.stringify(wp_data)} */}
        </div>
    )
}

export default WpArticles