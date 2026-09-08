export const Loading = ({ text }) => {
    return (
        <div>
            <div className="flex flex-col items-center justify-center py-20">
                <span className="loading loading-spinner loading-lg text-green-600"></span>

                <p className="mt-3 text-gray-600">
                    {text}
                </p>
            </div>
        </div>


    );
};

export default Loading;