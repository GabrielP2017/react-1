import "./Profile.css" // css 받아오기.

const user = {
    name: 'Hedy Lamarr',
    imageUrl: 'https://i.imgur.com/yXOvdOSs.jpg',
    imageSize: 90,
  };


export default function Profile() {
    return(
        <>
            <h1>{user.name}</h1>
            <img
                className="avatar" // CSS클래스 지정
                src={user.imageUrl}
                alt={'Photo of ' + user.name}
                style={{
                width: user.imageSize,
                height: user.imageSize
                }}
            />
        </>
    )
}