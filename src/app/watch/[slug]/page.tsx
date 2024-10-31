const VideoPage: React.FC<{
    params: { slug: string };
}> = ({ params }) => {
    return (
        <div>
            <h1>{params.slug}</h1>
        </div>
    );
};

export default VideoPage;
