import { Router } from "express";
import * as customerController from '../controllers/customerController.js';

const router = Router();

router.post('/customer-signup', customerController.customerSignup);
router.post('/customer-login', customerController.customerLogin);
router.post('/verify-customer', customerController.verifyCustomer);
router.post('/customer_google_login', customerController.customerGoogleLogin);
router.post('/get-customer-detail', customerController.getCustomersDetail);
router.get('/get-all-customers', customerController.getAllCustomers);
router.post('/get-customers-review', customerController.getCustomersReview);
router.post('/store-file', customerController.storeFile);
router.post('/deduct-wallet', customerController.calculateAndDeductChatPrice);
router.post('/add-profile', customerController.linkedProfile);
router.post('/update-customer-details', customerController.updateCustomerDetails);
router.post('/recharge-customer-wallet', customerController.rechargeCustomerWallet);
router.post('/customer-wallet-balance', customerController.customersWalletBalance);
router.post('/customers_wallet_history', customerController.customersWalletHistory);
router.get('/get_customer_all_first_recharge_offfer', customerController.getCustomerAllFirstRechargeOffer);
router.get('/get_customer_all_recharge_plan', customerController.getCustomerAllRechargePlan);
router.post('/get-linked-profile', customerController.getallLinkedProfile);
router.post('/customers-chat-history', customerController.chatHistoryOfCustomer);
router.post('/send-notification-to-customer', customerController.sendNotificationToCustomer);
router.post('/get_custmer_notification', customerController.getCustmerNotification);
router.post('/update_customer_notification', customerController.updateCustomerNotification);
router.post('/deduct-call-price', customerController.calculateAndDeductCallPrice);
router.post('/customers-call-history', customerController.CallHistoryOfCustomer);
router.post('/initiate-call', customerController.initiateCall);
router.post('/initiate-chat', customerController.initiateChat);
router.post('/create-call', customerController.createCall);
router.post('/timeout-call', customerController.timeoutCall);
router.post('/cancel-call', customerController.cancelCall);
router.post('/accept-call', customerController.acceptCall);
router.post('/reject-call', customerController.rejectCall);
router.post('/end-call', customerController.endCall);
router.post('/get-call-data', customerController.getCallData);
router.post('/disconect-call', customerController.disconectCall);
router.post('/deduct-balance', customerController.updateChatHistoryAndBalances);
router.get('/customer-home-banner', customerController.customerHomeBanner);
router.get('/astrologer-detailes-banner', customerController.astrologerDetailesBanner);
router.post('/initate_live_streaming', customerController.initateLiveStreaming);
router.post('/create_live_room', customerController.createLiveRoom);
router.post('/end_live_streaming', customerController.endLiveStreaming);
router.post('/stop_live_streaming', customerController.stopLiveStreaming);
router.get('/get_live_streaming', customerController.getLiveStreaming);
router.post('/send_gift_in_live_streaming', customerController.sendGiftInLiveStreaming);
router.post('/create_live_calls', customerController.createLiveCalls);
router.post('/end_live_calls', customerController.endLiveCalls);

// Testimonial Routes
router.get('/get-all-testimonial', customerController.getAllTestimonial);

// Blog Routes
router.get('/blog-list', customerController.blogList);

export default router;
