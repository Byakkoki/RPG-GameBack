import {User} from "../../entity/user.entity";


interface RequestWithUser extends Request {
    user: User
}
export default RequestWithUser
