"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SublinksClient = void 0;
const cache_1 = require("./cache");
const lemmy_js_client_1 = require("lemmy-js-client");
const native_client_1 = require("./native-client");
/**
 * Universal Sublinks/Lemmy client that works with both APIs
*/
class SublinksClient {
    /**
     * Client library for Sublinks and, during compatibility phase, Lemmy.
     *
     * @param instance should be the domain of the instance without the scheme (e.g. sublinks.example.com).  HTTPS is assumed and enforced by the library.
     * @param options is an object of type HttpClientConstructorOptions
    */
    constructor(instance, options) {
        var _a;
        // Strip scheme and anything except the hostname if provided
        this.instance = instance;
        if (instance.startsWith('https://') || instance.startsWith('http://')) {
            this.instance = new URL(instance).host;
        }
        let scheme = (options === null || options === void 0 ? void 0 : options.insecure) ? 'http://' : 'https://';
        this.headers = (options === null || options === void 0 ? void 0 : options.headers) || {};
        this.baseURL = `${scheme}${this.instance}`;
        this.lemmy = new lemmy_js_client_1.LemmyHttp(this.baseURL, options);
        this.native = new native_client_1.SublinksHttp(this.baseURL, options);
        this.cache = new cache_1.FetchCache((_a = options === null || options === void 0 ? void 0 : options.cacheTime) !== null && _a !== void 0 ? _a : 60);
    }
    // Utility Functions
    /** Returns the current date/time as a Unix timestamp rounded down to nearest second. */
    now() {
        return Math.floor(new Date().getTime() / 1000);
    }
    // Native Method Wrappers
    /** Fetches and returns the version of the native API */
    apiVersion() {
        return this.native.apiVersion();
    }
    // Lemmy API Compatibility Wrappers
    addAdmin(form) {
        return this.lemmy.addAdmin(form);
    }
    addModToCommunity(form) {
        return this.lemmy.addModToCommunity(form);
    }
    approveRegistrationApplication(form) {
        return this.lemmy.approveRegistrationApplication(form);
    }
    banFromCommunity(form) {
        return this.lemmy.banFromCommunity(form);
    }
    banPerson(form) {
        return this.lemmy.banPerson(form);
    }
    blockCommunity(form) {
        return this.lemmy.blockCommunity(form);
    }
    blockInstance(form) {
        return this.lemmy.blockInstance(form);
    }
    blockPerson(form) {
        return this.lemmy.blockPerson(form);
    }
    changePassword(form) {
        return this.lemmy.changePassword(form);
    }
    createComment(form) {
        return this.lemmy.createComment(form);
    }
    createCommentReport(form) {
        return this.lemmy.createCommentReport(form);
    }
    createCommunity(form) {
        return this.lemmy.createCommunity(form);
    }
    createCustomEmoji(form) {
        return this.lemmy.createCustomEmoji(form);
    }
    createPost(form) {
        return this.lemmy.createPost(form);
    }
    createPostReport(form) {
        return this.lemmy.createPostReport(form);
    }
    createPrivateMessage(form) {
        return this.lemmy.createPrivateMessage(form);
    }
    createPrivateMessageReport(form) {
        return this.lemmy.createPrivateMessageReport(form);
    }
    createSite(form) {
        return this.lemmy.createSite(form);
    }
    deleteAccount(form) {
        return this.lemmy.deleteAccount(form);
    }
    deleteComment(form) {
        return this.lemmy.deleteComment(form);
    }
    deleteCommunity(form) {
        return this.lemmy.deleteCommunity(form);
    }
    deleteCustomEmoji(form) {
        return this.lemmy.deleteCustomEmoji(form);
    }
    deleteImage({ token, filename }) {
        return this.lemmy.deleteImage({ token, filename });
    }
    deletePost(form) {
        return this.lemmy.deletePost(form);
    }
    deletePrivateMessage(form) {
        return this.lemmy.deletePrivateMessage(form);
    }
    distinguishComment(form) {
        return this.lemmy.distinguishComment(form);
    }
    editComment(form) {
        return this.lemmy.editComment(form);
    }
    editCommunity(form) {
        return this.lemmy.editCommunity(form);
    }
    editCustomEmoji(form) {
        return this.lemmy.editCustomEmoji(form);
    }
    editPost(form) {
        return this.lemmy.editPost(form);
    }
    editPrivateMessage(form) {
        return this.lemmy.editPrivateMessage(form);
    }
    editSite(form) {
        return this.lemmy.editSite(form);
    }
    exportSettings() {
        return this.lemmy.exportSettings();
    }
    featurePost(form) {
        return this.lemmy.featurePost(form);
    }
    followCommunity(form) {
        return this.lemmy.followCommunity(form);
    }
    generateTotpSecret() {
        return this.lemmy.generateTotpSecret();
    }
    getBannedPersons() {
        return this.lemmy.getBannedPersons();
    }
    getCaptcha() {
        return this.lemmy.getCaptcha();
    }
    getComment(form) {
        return this.lemmy.getComment(form);
    }
    getComments(form = {}) {
        return this.lemmy.getComments(form);
    }
    getCommunity(form = {}, cacheOptions) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            if (!form.id && !form.name)
                return {};
            const cacheKey = form.id ? `getCommunity_id_${form.id.toString()}` : `getCommunity_name_${form.name}`;
            return (_a = this.cache.get(cacheKey, cacheOptions)) !== null && _a !== void 0 ? _a : this.cache.put(cacheKey, yield this.lemmy.getCommunity(form), cacheOptions);
        });
    }
    getFederatedInstances(cacheOptions) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const cacheKey = "getFederatedInstances";
            return (_a = this.cache.get(cacheKey, cacheOptions)) !== null && _a !== void 0 ? _a : this.cache.put(cacheKey, yield this.lemmy.getFederatedInstances(), cacheOptions);
        });
    }
    getModlog(form = {}, cacheOptions) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            let cacheKey = 'getModlog';
            if (form.mod_person_id)
                cacheKey += `_mod_person_id_${form.mod_person_id.toString()}`;
            if (form.community_id)
                cacheKey += `_community_id_${form.community_id.toString()}`;
            if (form.page)
                cacheKey += `_page_${form.page.toString()}`;
            if (form.limit)
                cacheKey += `_limit_${form.limit.toString()}`;
            if (form.type_)
                cacheKey += `_type_${form.type_}`;
            if (form.other_person_id)
                cacheKey += `_other_person_id_${form.other_person_id.toString()}`;
            if (form.post_id)
                cacheKey += `_post_id_${form.post_id.toString()}`;
            if (form.comment_id)
                cacheKey += `_comment_id_${form.comment_id.toString()}`;
            return (_a = this.cache.get(cacheKey, cacheOptions)) !== null && _a !== void 0 ? _a : this.cache.put(cacheKey, yield this.lemmy.getModlog(form), cacheOptions);
        });
    }
    getPersonDetails(form = {}) {
        return this.lemmy.getPersonDetails(form);
    }
    getPersonMentions(form) {
        return this.lemmy.getPersonMentions(form);
    }
    getPost(form = {}) {
        return this.lemmy.getPost(form);
    }
    getPosts(form = {}) {
        return this.lemmy.getPosts(form);
    }
    getPrivateMessages(form) {
        return this.lemmy.getPrivateMessages(form);
    }
    getReplies(form) {
        return this.lemmy.getReplies(form);
    }
    getReportCount(form) {
        return this.lemmy.getReportCount(form);
    }
    /** Gets the site info and optionally caches it.
     * @param options   Options to control the cache behavior
    **/
    getSite(cacheOptions) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            return (_a = this.cache.get('getSite', cacheOptions)) !== null && _a !== void 0 ? _a : this.cache.put('getSite', yield this.lemmy.getSite(), cacheOptions);
        });
    }
    getSiteMetadata(form) {
        return this.lemmy.getSiteMetadata(form);
    }
    getUnreadCount() {
        return this.lemmy.getUnreadCount();
    }
    getUnreadRegistrationApplicationCount() {
        return this.lemmy.getUnreadRegistrationApplicationCount();
    }
    hideCommunity(form) {
        return this.lemmy.hideCommunity(form);
    }
    importSettings(form) {
        return this.lemmy.importSettings(form);
    }
    leaveAdmin() {
        return this.lemmy.leaveAdmin();
    }
    likeComment(form) {
        return this.lemmy.likeComment(form);
    }
    likePost(form) {
        return this.lemmy.likePost(form);
    }
    listCommentReports(form) {
        return this.lemmy.listCommentReports(form);
    }
    listCommunities(form = {}) {
        return this.lemmy.listCommunities(form);
    }
    listLogins() {
        return this.lemmy.listLogins();
    }
    listPostReports(form) {
        return this.lemmy.listPostReports(form);
    }
    listPrivateMessageReports(form) {
        return this.lemmy.listPrivateMessageReports(form);
    }
    listRegistrationApplications(form) {
        return this.lemmy.listRegistrationApplications(form);
    }
    lockPost(form) {
        return this.lemmy.lockPost(form);
    }
    login(form) {
        return this.lemmy.login(form);
    }
    logout() {
        return this.lemmy.logout();
    }
    markAllAsRead() {
        return this.lemmy.markAllAsRead();
    }
    markCommentReplyAsRead(form) {
        return this.lemmy.markCommentReplyAsRead(form);
    }
    markPersonMentionAsRead(form) {
        return this.lemmy.markPersonMentionAsRead(form);
    }
    markPostAsRead(form) {
        return this.lemmy.markPostAsRead(form);
    }
    markPrivateMessageAsRead(form) {
        return this.lemmy.markPrivateMessageAsRead(form);
    }
    passwordChangeAfterReset(form) {
        return this.lemmy.passwordChangeAfterReset(form);
    }
    passwordReset(form) {
        return this.lemmy.passwordReset(form);
    }
    purgeComment(form) {
        return this.lemmy.purgeComment(form);
    }
    purgeCommunity(form) {
        return this.lemmy.purgeCommunity(form);
    }
    purgePerson(form) {
        return this.lemmy.purgePerson(form);
    }
    purgePost(form) {
        return this.lemmy.purgePost(form);
    }
    register(form) {
        return this.lemmy.register(form);
    }
    removeComment(form) {
        return this.lemmy.removeComment(form);
    }
    removeCommunity(form) {
        return this.lemmy.removeCommunity(form);
    }
    removePost(form) {
        return this.lemmy.removePost(form);
    }
    resolveCommentReport(form) {
        return this.lemmy.resolveCommentReport(form);
    }
    resolveObject(form) {
        return this.lemmy.resolveObject(form);
    }
    resolvePostReport(form) {
        return this.lemmy.resolvePostReport(form);
    }
    resolvePrivateMessageReport(form) {
        return this.lemmy.resolvePrivateMessageReport(form);
    }
    saveComment(form) {
        return this.lemmy.saveComment(form);
    }
    savePost(form) {
        return this.lemmy.savePost(form);
    }
    saveUserSettings(form) {
        return this.lemmy.saveUserSettings(form);
    }
    search(form) {
        return this.lemmy.search(form);
    }
    /**
     * Convenience method to set the `Authorization: Bearer {token}` header
    */
    setAuth(jwt) {
        this.setHeader("Authorization", `Bearer ${jwt}`);
    }
    /**
     * Sets an individual header key to the provided value or removes the key from the headers if a value is not provided.
     * Then calls `setHeaders` with the updated headers object.
    */
    setHeader(key, value) {
        if (value)
            this.headers[key] = value;
        else if (this.headers[key])
            delete this.headers[key];
        this.setHeaders(this.headers);
    }
    setHeaders(headers) {
        this.lemmy.setHeaders(headers);
    }
    transferCommunity(form) {
        return this.lemmy.transferCommunity(form);
    }
    updateTotp(form) {
        return this.lemmy.updateTotp(form);
    }
    uploadImage({ image }) {
        return this.lemmy.uploadImage({ image });
    }
    validateAuth() {
        return this.lemmy.validateAuth();
    }
    verifyEmail(form) {
        return this.lemmy.verifyEmail(form);
    }
}
exports.SublinksClient = SublinksClient;
