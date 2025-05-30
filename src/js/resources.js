import { ImageSource, Sound, Resource, Loader } from 'excalibur'
import { Background } from './background'
import { Zombie } from './zombie'

// voeg hier jouw eigen resources toe
const Resources = {
    Shooter: new ImageSource('images/shooter.webp'),
    Zombie: new ImageSource('images/zombie.png'),
    Speedzombie: new ImageSource('images/speedzombie.png'),
    Background: new ImageSource('images/background.png'),
    Bullet: new ImageSource('images/bullet.png'),

}




const ResourceLoader = new Loader()
for (let res of Object.values(Resources)) {
    ResourceLoader.addResource(res)
}

export { Resources, ResourceLoader }