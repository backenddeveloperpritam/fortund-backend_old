import express from 'express';

import * as adminController from '../controllers/adminController.js';
const router = express.Router();

router.post('/skill', adminController.skill);
router.get('/get-skill', adminController.getAllSkills);
router.post('/update-skill', adminController.updateSkill);
router.post('/delete-skill', adminController.deleteSkill);

router.post('/sub-skill', adminController.subSkill);
router.get('/get-sub-skill', adminController.getAllSubSkills);
router.post('/update-sub-skill', adminController.updateSubSkill);
router.post('/delete-sub-skill', adminController.deleteSubSkill);

router.post('/create_recharge_plan', adminController.createRechargePlan);
router.post('/update-recharge-plan', adminController.updateRechargePlan);
router.post('/delete-recharge-plan', adminController.deleteRechargePlan);
router.post('/update-recharge-plan-status', adminController.updateRechargePlanStatus)

router.post('/add-remedy', adminController.addRemedy);
router.get('/view-remedy', adminController.viewRemedy);
router.post('/update-remedy', adminController.updateRemedy);
router.post('/delete-remedy', adminController.deleteRemedy);

router.post('/add-expertise', adminController.addExpertise);
router.get('/get-all-expertise', adminController.getExpertise);
router.post('/update-expertise', adminController.updateExpertise);
router.post('/delete-expertise', adminController.deleteExpertise);

router.post('/add-main-expertise', adminController.addMainExpertise);
router.get('/get-all-main-expertise', adminController.getMainExpertise);
router.post('/update-main-expertise', adminController.updateMainExpertise);
router.post('/delete-main-expertise', adminController.deleteMainExpertise);

// router.post('/update-main-expertise', adminController.updateMainExpertise);
// router.post('/delete-main-expertise', adminController.deleteMainExpertise);

router.post('/add-gift', adminController.addGift);
router.get('/get-all-gift', adminController.viewGift);
router.post('/update-gift', adminController.updateGift);
router.post('/delete-gift', adminController.deleteGift);

router.post('/add-review', adminController.addReview);
router.post('/verify-review', adminController.verifyReview);
router.get('/get-all-review', adminController.getAllReview);
router.post('/update-review', adminController.updateReview);
router.post('/get-astrologer-review', adminController.getAstrologersReviews);
router.post('/get-verified-astrologer-review', adminController.astrologersVerifiedReviews);
router.post('/delete-review', adminController.deleteReview);

router.post('/add-faq', adminController.addFaq);
router.get('/get-all-faq', adminController.getAllFaq);
router.post('/update-faq', adminController.updateFaq);
router.post('/delete-faq', adminController.deleteFaq);

router.post('/add-terms-condition', adminController.addTandC);
router.post('/delete-terms-condition', adminController.deleteTandC);
router.get('/get-terms-condition', adminController.viewTandC);

router.post('/add-privacy-policy', adminController.addPrivacyPolicy);
router.get('/get-privacy-policy', adminController.viewPrivacyPolicy);
router.post('/delete-privacy-policy', adminController.deletePrivacyPolicy);

router.post('/add-video-url', adminController.addVideoUrl);
router.get('/get-video-url', adminController.viewVideoUrl);
router.post('/delete-video-url/:id', adminController.deleteVideoUrl);

router.post('/add-title', adminController.addAskAstrologer);
router.get('/get-all-title', adminController.getAskAstrologer);
router.post('/update-title', adminController.updateAskAstrologer);
router.post('/delete-title', adminController.deleteAskAstrologer);

router.post('/add-ask-question', adminController.addAskQuestion);
router.get('/get-all-ask-question', adminController.getAskQuestion);
router.post('/update-ask-question', adminController.updateAskQuestion);
router.post('/delete-ask-question', adminController.deleteAskQuestion);

router.post('/add-religion-spirituality', adminController.addReligionSpirituality);
router.get('/get-all-religion-spirituality', adminController.getReligionSpirituality);
router.post('/update-religion-spirituality', adminController.updateReligionSpirituality);
router.post('/delete-religion-spirituality', adminController.deleteReligionSpirituality);

router.post('/add-astro-magazine', adminController.addAstroMagazine);
router.get('/get-all-astro-magazine', adminController.getAstroMagazine);
router.post('/update-astro-magazine', adminController.updateAstroMagazine);
router.post('/delete-astro-magazine', adminController.deleteAstroMagazine);

router.post('/add-remedies', adminController.addRemedies);
router.get('/get-all-remedies', adminController.getRemedies);
router.post('/update-remedies', adminController.updateRemedies);
router.post('/delete-remedies', adminController.deleteRemedies);

router.post('/add-birhat-horoscope', adminController.addBirhatHoroscope);
router.get('/get-all-birhat-horoscope', adminController.getBirhatHoroscope);
router.post('/update-birhat-horoscope', adminController.updateBirhatHoroscope);
router.post('/delete-birhat-horoscope', adminController.deleteBirhatHoroscope);

router.post('/add-auspicious-time', adminController.addAuspiciousTime);
router.get('/get-all-auspicious-time', adminController.getAuspiciousTime);
router.post('/update-auspicious-time', adminController.updateAuspiciousTime);
router.post('/delete-auspicious-time', adminController.deleteAuspiciousTime);

router.post('/add-daily-panchang', adminController.addDailyPanchang);
router.get('/get-all-daily-panchang', adminController.getDailyPanchang);
router.post('/update-daily-panchang', adminController.updateDailyPanchang);
router.post('/delete-daily-panchang', adminController.deleteDailyPanchang);

router.post('/add-yellow-book', adminController.addYellowBook);
router.get('/get-all-yellow-book', adminController.getYellowBook);
router.post('/update-yellow-book', adminController.updateYellowBook);
router.post('/delete-yellow-book', adminController.deleteYellowBook);

router.post('/add-numerology', adminController.addNumerology);
router.get('/get-all-numerology', adminController.getAllNumerology);
router.post('/update-numerology', adminController.updateNumerology);
router.post('/delete-numerology', adminController.deleteNumerology);

router.post('/add-vivahMuhurat', adminController.addVivahMuhurat);
router.get('/get-all-vivahMuhurat', adminController.getAllVivahMuhurat);
router.post('/update-vivahMuhurat', adminController.updateVivahMuhurat);
router.post('/delete-vivahMuhurat', adminController.deleteVivahMuhurat);

router.post('/add-mundanMuhurat', adminController.addMundanMuhurat);
router.get('/get-all-mundanMuhurat', adminController.getAllMundanMuhurat);
router.post('/update-mundanMuhurat', adminController.updateMundanMuhurat);
router.post('/delete-mundanMuhurat', adminController.deleteMundanMuhurat);

router.post('/add-annaprashan', adminController.addAnnaprashan);
router.get('/get-all-annaprashan', adminController.getAllAnnaprashan);
router.post('/update-annaprashan', adminController.updateAnnaprashan);
router.post('/delete-annaprashan', adminController.deleteAnnaprashan);

router.post('/add-question', adminController.addAskAstrologerQuestion);
router.get('/get-all-question', adminController.getAllQuestions);
router.post('/update-question', adminController.updateAskAstrologerQuestion);
router.post('/delete-question/:id', adminController.deleteQuestion);

router.post('/add-astrologer', adminController.addAstrologer);
router.post('/update-astrologer', adminController.updateAstrologer);
router.get('/get-all-astrologers', adminController.getAllAstrologers);
router.get('/get_astrologer_requests', adminController.getAstrologerRequests);
router.post('/update_service_charges', adminController.updateServiceCharges)
router.post('/delete-astrologer-account', adminController.deleteAstrologerAccount);

// Blogs Category
router.post('/add-blog-category', adminController.addBlogCategory);
router.get('/blog-category-list', adminController.categoryBlogList);


// Blog
router.post('/add-blog', adminController.addBlog);
router.get('/blog-list', adminController.blogList);
router.post('/update-blog', adminController.updateBlog);
router.post('/delete-blog', adminController.deleteBlog);



router.post('/get-astrologer-id', adminController.checkAstrologer);

// ======================== Testimonial ======================
router.post('/add-testimonial', adminController.addTestimonial);
router.put('/update-testimonial/:testimonialId', adminController.updateTestimonial);
router.get('/get-all-testimonial', adminController.getAllTestimonial);
router.post('/delete-testimonial', adminController.deleteTestimonial);

router.post('/add-customer', adminController.addCustomer);
router.get('/get-all-customer', adminController.getAllCustomers);
router.post('/delete-customer', adminController.deleteCustomer);

router.post('/add-user', adminController.addUser);
router.get('/get-all-user', adminController.getAllUser);
router.post('/delete-user', adminController.deleteUser);
router.post('/block-user/:userId', adminController.blockUser);

router.post('/add-announcement', adminController.addAnnouncement);
router.get('/get-all-anouncement', adminController.getAnnouncement);
router.post('/update-announcement', adminController.updateAnnouncement);
router.post('/delete-announcement', adminController.deleteAnnouncement);

router.post('/add-screenshot', adminController.addScreenshot);

// router.get('/get-chat-history', adminController.getChatHistory);

router.post('/add-banners', adminController.addBanners);
router.get('/get-banners', adminController.getAllBanners);
router.get('/get-app-banners', adminController.getAppBanners);


router.post('/update-banners', adminController.updateBanners);
router.post('/delete-banners', adminController.deleteBanners);

router.post('/notification-from-admin', adminController.sendNotificationFromAdmin);
router.get('/get-admin-notifications', adminController.getAllNotifications);
router.get('/get-all-recharge-plans', adminController.getAllRechargePlan);

router.post('/add-first-recharge', adminController.firstRechargeOffer);
router.post('/update-first-recharge-offer', adminController.updateFirstRechargeOffer);
router.get('/get-first-recharge', adminController.getAllFirstRechargeOffer);
router.post('/delete-first-recharge-offer', adminController.deleteFirstRechargeOffer)

router.get('/get-all-customers', adminController.getAllCustomers);
router.post('/change-banned-status', adminController.changeBannedStatus);
router.post('/set-customer-online', adminController.setCustomerOnline);

router.post('/update-customer-data', adminController.updateCustomerdata);
router.post('/recharge-customer-wallet', adminController.rechargeCustomerWallet);
router.post('/customers-payment-list', adminController.getCustomersPayment);

router.post('/delete-customer', adminController.deleteCustomer);
router.post('/customers-order-history', adminController.customerOrderHistory);

router.post('/add-app-review', adminController.addAppReview);
router.post('/verify-app-review', adminController.verifyAppReview);
router.get('/get-all-app-review', adminController.getAllAppReview);
router.post('/delete-app-review', adminController.deleteAppReview);

router.post('/send_customer_notification', adminController.sendCustomerNotification)
router.get('/get-customer-notification', adminController.getCustomerNotification)
router.post('/send_astrologer_notification', adminController.sendAstrologerNotification)
router.get('/get-astrologer-notification', adminController.getAstrologerNotification)

router.get('/get_dashboard', adminController.getDashboard)

router.get('/get_chat_history', adminController.getChatHistory)
router.get('/get_admin_earnig_history', adminController.getAdminEarnigHistory)
router.get('/get_call_history', adminController.getCallHistory)
router.post('/create_language', adminController.createLanguage)
router.get('/get_language', adminController.getLanguage)
router.post('/update_language', adminController.updateLanguage)
router.post('/delete_language', adminController.deleteLanguage)

router.get('/get_wallet_payments', adminController.getWalletPayments)

router.post('/create_qualifications', adminController.createQualifications)
router.post('/get_qualifications', adminController.getQualifications)
router.post('/update_qualifications', adminController.updateQualifications)


router.post('/create_live_streaming', adminController.createLiveStreaming)

//Pooja Category 
router.post('/create-pooja-category', adminController.addPoojaCategory)
router.get('/pooja-category-list', adminController.PoojaCategoryList)
router.put('/update-pooja-category', adminController.updatePoojaCategory)
router.delete('/delete-pooja-category', adminController.deletePoojaCategory)
router.put('/update-pooja-category-status', adminController.updatePoojaCategoryStatus)


//Pooja 
router.post('/create-pooja', adminController.addPooja)
router.get('/pooja-list', adminController.PoojaList)
router.put('/update-pooja', adminController.updatePooja)
router.delete('/delete-pooja', adminController.deletePooja)
router.put('/update-pooja-status', adminController.updatePoojaStatus)

//Product Category
router.post('/create-product-category', adminController.addProductCategory)
router.get('/product-category-list', adminController.ProductCategoryList)
router.put('/update-product-category', adminController.updateProductCategory)
router.delete('/delete-product-category', adminController.deleteProductCategory)
router.put('/update-product-category-status', adminController.updateProductCategoryStatus)

//Product
router.post('/create-product', adminController.addProduct)
router.get('/products-list', adminController.ProductList)
// router.put('/update-product/:productId',adminController.updateProduct)




export default router;