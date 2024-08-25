const Page = () => {
    return (
        <div className="flex flex-col items-center p-4">
            <div className="w-full grid grid-cols-6 gap-4">
                <div className="bg-green-700 min-w-full aspect-square [transform:perspective(450px)rotateX(10deg)] origin-bottom">
                    <p className="text-white">Start Position</p>
                    <img
                        src='https://i.scdn.co/image/ab67616d0000b2733b494c1b464d41ef641de442'
                        className="object-fill"
                    />
                </div>
                <div className="bg-green-700 min-w-full aspect-square [transform:perspective(450px)rotateX(15deg)translateY(-50px)] origin-bottom">
                    <p className="text-white">Sliding Up</p>
                    <img
                        src='https://i.scdn.co/image/ab67616d0000b2733b494c1b464d41ef641de442'
                        className="object-fill"
                    />
                </div>
                <div className="bg-green-700 min-w-full aspect-square [transform:perspective(600px)rotateX(15deg)translateY(150px)] origin-bottom ">
                    <p className="text-white">Sliding Out</p>
                    <img
                        src='https://i.scdn.co/image/ab67616d0000b2733b494c1b464d41ef641de442'
                        className="object-fill"
                    />
                </div>
                <div className="bg-green-700 min-w-full aspect-square [transform:translateY(150px)] origin-bottom">
                    <p className="text-white">Rotate Back Forward</p>
                    <img
                        src='https://i.scdn.co/image/ab67616d0000b2733b494c1b464d41ef641de442'
                        className="object-fill"
                    />
                </div>
                <div className="bg-green-700 min-w-full aspect-square animate-album-slide origin-bottom ">
                    <p className="text-white">Animated</p>
                    <img
                        src='https://i.scdn.co/image/ab67616d0000b2733b494c1b464d41ef641de442'
                        className="object-fill"
                    />
                </div>
                <div className="bg-green-700 min-w-full aspect-square animate-album-slide-back origin-bottom ">
                    <p className="text-white">Animated Back</p>
                    <img
                        src='https://i.scdn.co/image/ab67616d0000b2733b494c1b464d41ef641de442'
                        className="object-fill"
                    />
                </div>
            </div>
        </div>
    )
}

export default Page