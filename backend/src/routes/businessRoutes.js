import express from 'express';
import {
    createBusiness,
    getBusinessById,
    getAllBusinessesOfUser,
    updateBusiness,
    deleteBusiness,
    sendBusinessInvite,
    joinBusinessByInvite,
    getBusinessMemberById,
    getAllBusinessMembers
} from '../controllers/businessController.js';
import { createBusinessSchema, deleteBusinessByIdSchema, getBusinessByIdSchema, sendBusinessInviteSchema, updateBusinessSchema } from '../validations/businessValidations.js';
import { authentication, authorizeBusinessRole } from '../middlewares/authenticationMiddlewares.js';
const router = express.Router();
import multer from 'multer';
import { validationMiddleware } from '../middlewares/validationMiddleware.js';
import { BUSINESS_ROLES } from '../utils/constants.js';
const upload = multer()


router.post('/',
    authentication,
    upload.fields([
        { name: 'logo', maxCount: 1 },
        { name: 'banner', maxCount: 1 }
    ]),
    validationMiddleware(createBusinessSchema, req => req.body),
    createBusiness
);  

router.get('/',
    authentication,
    getAllBusinessesOfUser
);

router.get('/:id',
    authentication,
    validationMiddleware(getBusinessByIdSchema, req => req.params),
    getBusinessById
); 

router.patch('/:id',
    authentication,
    upload.fields([
        { name: 'logo', maxCount: 1 },
        { name: 'banner', maxCount: 1 }
    ]),
    authorizeBusinessRole([BUSINESS_ROLES.SUPER_ADMIN, BUSINESS_ROLES.ADMIN]),
    validationMiddleware(updateBusinessSchema, req => req.body),
    updateBusiness
);

router.delete('/:id',
    authentication,
    authorizeBusinessRole([BUSINESS_ROLES.SUPER_ADMIN]),
    validationMiddleware(deleteBusinessByIdSchema, req => req.params),
    deleteBusiness
); 

router.post(
    '/invite/send',
    authentication,
    validationMiddleware(sendBusinessInviteSchema, req => req.body),
    authorizeBusinessRole([BUSINESS_ROLES.SUPER_ADMIN, BUSINESS_ROLES.ADMIN]),
    sendBusinessInvite
  );

router.post(
    '/invite/join',
    authentication,
    joinBusinessByInvite
);
  
router.get(
    '/:businessId/members',
    authentication,
    authorizeBusinessRole([BUSINESS_ROLES.SUPER_ADMIN, BUSINESS_ROLES.ADMIN]),
    getAllBusinessMembers
);

router.get('/:businessId/members/:memberId',
    authentication,
    authorizeBusinessRole([BUSINESS_ROLES.SUPER_ADMIN, BUSINESS_ROLES.ADMIN]),
    getBusinessMemberById
);

export default router;
