export interface LemmyHttpClientConstructorOptions {
    fetchFunction?: typeof fetch,
    headers?: { [key:string]: string}
}

import type { 
    AddAdmin,
    AddAdminResponse,
    AddModToCommunity,
    AddModToCommunityResponse,
    ApproveRegistrationApplication,
    BanFromCommunity,
    BanFromCommunityResponse,
    BanPerson,
    BanPersonResponse,
    BannedPersonsResponse,
    BlockCommunity,
    BlockCommunityResponse,
    BlockInstance,
    BlockInstanceResponse,
    BlockPerson,
    BlockPersonResponse,
    ChangePassword,
    CommentResponse,
    CommentReplyResponse,
    CommentReportResponse,
    CommunityResponse,
    CreateComment,
    CreateCommentLike,
    CreateCommentReport,
    CreateCommunity,
    CreateCustomEmoji,
    CreatePost,
    CreatePostLike,
    CreatePostReport,
    CreatePrivateMessage,
    CreatePrivateMessageReport,
    CreateSite,
    CustomEmojiResponse,
    DeleteAccount,
    DeleteComment,
    DeleteCommunity,
    DeleteCustomEmoji,
    DeleteImage,
    DeletePost,
    DeletePrivateMessage,
    DistinguishComment,
    EditComment,
    EditCommunity,
    EditCustomEmoji,
    EditPost,
    EditPrivateMessage,
    EditSite,
    FeaturePost,
    FollowCommunity,
    GenerateTotpSecretResponse,
    GetCaptchaResponse,
    GetComment,
    GetComments,
    GetCommentsResponse,
    GetCommunity,
    GetCommunityResponse,
    GetFederatedInstancesResponse,
    GetModlog,
    GetModlogResponse,
    GetPersonDetails,
    GetPersonDetailsResponse,
    GetPersonMentions,
    GetPersonMentionsResponse,
    GetPost,
    GetPostResponse,
    GetPosts,
    GetPostsResponse,
    GetPrivateMessages,
    GetReplies,
    GetRepliesResponse,
    GetReportCount,
    GetReportCountResponse,
    GetSiteMetadata,
    GetSiteMetadataResponse,
    GetSiteResponse,
    GetUnreadCountResponse,
    GetUnreadRegistrationApplicationCountResponse,
    HideCommunity,
    ListCommentReports,
    ListCommentReportsResponse,
    ListCommunities,
    ListCommunitiesResponse,
    ListPostReports,
    ListPostReportsResponse,
    ListPrivateMessageReports,
    ListPrivateMessageReportsResponse,
    ListRegistrationApplications,
    ListRegistrationApplicationsResponse,
    LockPost,
    Login,
    LoginResponse,
    LoginToken,
    MarkCommentReplyAsRead,
    MarkPersonMentionAsRead,
    MarkPostAsRead,
    MarkPrivateMessageAsRead,
    PasswordChangeAfterReset,
    PasswordReset,
    PersonMentionResponse,
    PostResponse,
    PostReportResponse,
    PrivateMessageResponse,
    PrivateMessagesResponse,
    PrivateMessageReportResponse,
    PurgeComment,
    PurgeCommunity,
    PurgePerson,
    PurgePost,
    Register,
    RegistrationApplicationResponse,
    RemoveComment,
    RemoveCommunity,
    RemovePost,
    ResolveCommentReport,
    ResolveObject,
    ResolveObjectResponse,
    ResolvePostReport,
    ResolvePrivateMessageReport,
    SaveComment,
    SavePost,
    SaveUserSettings,
    Search,
    SearchResponse,
    SiteResponse,
    SuccessResponse,
    TransferCommunity,
    UpdateTotp,
    UpdateTotpResponse,
    UploadImage,
    UploadImageResponse,
    VerifyEmail
} from 'lemmy-js-client'

import fetch from 'cross-fetch';
import { LemmyHttp } from 'lemmy-js-client'


export class SublinksClient {
    api:string;                 // Sublinks API URL
    lemmy:LemmyHttp             // Lemmy HTTP client for legacy API calls
    headers: { [key: string]: string } = {};
    
    constructor( instance: string, options?:LemmyHttpClientConstructorOptions) {
        this.api        = `https://${instance}/sublinks-api/v1`
        this.lemmy      = new LemmyHttp(`https://${instance}`, options);
    }


    /* 
        All of these methods just wrap the Lemmy JS client methods for initial compatibility. As native Sublinks API endpoints are brought online, the methods will be updated,
        one-by-one, to use native calls instead of the Lemmy compatibility API.
    */

    addAdmin(form: AddAdmin): Promise<AddAdminResponse> {
        return this.lemmy.addAdmin(form);
    }

    addModToCommunity(form: AddModToCommunity): Promise<AddModToCommunityResponse> {
        return this.lemmy.addModToCommunity(form);
    }

    approveRegistrationApplication(form: ApproveRegistrationApplication): Promise<RegistrationApplicationResponse> {
        return this.lemmy.approveRegistrationApplication(form);
    }

    banFromCommunity(form: BanFromCommunity): Promise<BanFromCommunityResponse> {
        return this.lemmy.banFromCommunity(form);
    }

    banPerson(form: BanPerson): Promise<BanPersonResponse> {
        return this.lemmy.banPerson(form);
    }

    blockCommunity(form: BlockCommunity): Promise<BlockCommunityResponse> {
        return this.lemmy.blockCommunity(form);
    }
    
    blockInstance(form: BlockInstance): Promise<BlockInstanceResponse> {
        return this.lemmy.blockInstance(form);
    }

    blockPerson(form: BlockPerson): Promise<BlockPersonResponse> {
        return this.lemmy.blockPerson(form);
    }
    
    changePassword(form: ChangePassword): Promise<LoginResponse> {
        return this.lemmy.changePassword(form);
    }

    createComment(form: CreateComment): Promise<CommentResponse> {
        return this.lemmy.createComment(form);
    }

    createCommentReport(form: CreateCommentReport): Promise<CommentReportResponse> {
        return this.lemmy.createCommentReport(form);
    }

    createCommunity(form: CreateCommunity): Promise<CommunityResponse> {
        return this.lemmy.createCommunity(form);
    }

    createCustomEmoji(form: CreateCustomEmoji): Promise<CustomEmojiResponse> {
        return this.lemmy.createCustomEmoji(form);
    }
    
    createPost(form: CreatePost): Promise<PostResponse> {
        return this.lemmy.createPost(form);
    }

    createPostReport(form: CreatePostReport): Promise<PostReportResponse> {
        return this.lemmy.createPostReport(form)
    }

    createPrivateMessage(form: CreatePrivateMessage): Promise<PrivateMessageResponse> {
        return this.lemmy.createPrivateMessage(form);
    }

    createPrivateMessageReport(form: CreatePrivateMessageReport): Promise<PrivateMessageReportResponse> {
        return this.lemmy.createPrivateMessageReport(form);
    }

    createSite(form: CreateSite): Promise<SiteResponse> {
        return this.lemmy.createSite(form);
    }

    deleteAccount(form: DeleteAccount): Promise<SuccessResponse> {
        return this.lemmy.deleteAccount(form);
    }

    deleteComment(form: DeleteComment): Promise<CommentResponse> {
        return this.lemmy.deleteComment(form);
    }

    deleteCommunity(form: DeleteCommunity): Promise<CommunityResponse> {
        return this.lemmy.deleteCommunity(form);
    }

    deleteCustomEmoji(form: DeleteCustomEmoji): Promise<SuccessResponse> {
        return this.lemmy.deleteCustomEmoji(form);
    }

    deleteImage({ token, filename }: DeleteImage): Promise<boolean> {
        return this.lemmy.deleteImage({token, filename});
    }

    deletePost(form: DeletePost): Promise<PostResponse> {
        return this.lemmy.deletePost(form);
    }

    deletePrivateMessage(form: DeletePrivateMessage): Promise<PrivateMessageResponse> {
        return this.lemmy.deletePrivateMessage(form);
    }
    
    distinguishComment(form: DistinguishComment): Promise<CommentResponse> {
        return this.lemmy.distinguishComment(form);
    }

    editComment(form: EditComment): Promise<CommentResponse> {
        return this.lemmy.editComment(form);
    }

    editCommunity(form: EditCommunity): Promise<CommunityResponse> {
        return this.lemmy.editCommunity(form);
    }

    editCustomEmoji(form: EditCustomEmoji): Promise<CustomEmojiResponse> {
        return this.lemmy.editCustomEmoji(form);
    }

    editPost(form: EditPost): Promise<PostResponse> {
        return this.lemmy.editPost(form);
    }

    editPrivateMessage(form: EditPrivateMessage): Promise<PrivateMessageResponse> {
        return this.lemmy.editPrivateMessage(form);
    }

    editSite(form: EditSite): Promise<SiteResponse> {
        return this.lemmy.editSite(form);
    }

    exportSettings():Promise<any> {
        return this.lemmy.exportSettings();
    }
    
    featurePost(form: FeaturePost): Promise<PostResponse> {
        return this.lemmy.featurePost(form)
    }

    followCommunity(form: FollowCommunity):Promise<CommunityResponse> {
        return this.lemmy.followCommunity(form);
    }

    generateTotpSecret(): Promise<GenerateTotpSecretResponse> {
        return this.lemmy.generateTotpSecret();
    }
    
    getBannedPersons(): Promise<BannedPersonsResponse> {
        return this.lemmy.getBannedPersons();
    }

    getCaptcha(): Promise<GetCaptchaResponse> {
        return this.lemmy.getCaptcha();
    }

    getComment(form: GetComment): Promise<CommentResponse> {
        return this.lemmy.getComment(form);
    }

    getComments(form: GetComments = {}): Promise<GetCommentsResponse> {
        return this.lemmy.getComments(form);
    }
    
    getCommunity(form: GetCommunity = {}):Promise<GetCommunityResponse> {
        return this.lemmy.getCommunity(form);
    }

    getFederatedInstances(): Promise<GetFederatedInstancesResponse> {
        return this.lemmy.getFederatedInstances();
    }

    getModlog(form: GetModlog = {}): Promise<GetModlogResponse> {
        return this.lemmy.getModlog(form);
    }

    getPersonDetails(form: GetPersonDetails = {}): Promise<GetPersonDetailsResponse> {
        return this.lemmy.getPersonDetails(form);
    }

    getPersonMentions(form: GetPersonMentions): Promise<GetPersonMentionsResponse> {
        return this.lemmy.getPersonMentions(form);
    }

    getPost(form: GetPost = {}): Promise<GetPostResponse> {
        return this.lemmy.getPost(form);
    }

    getPosts(form: GetPosts = {}): Promise<GetPostsResponse> {
        return this.lemmy.getPosts(form);
    }

    getPrivateMessages(form: GetPrivateMessages): Promise<PrivateMessagesResponse> {
        return this.lemmy.getPrivateMessages(form);
    }

    getReplies(form: GetReplies): Promise<GetRepliesResponse> {
        return this.lemmy.getReplies(form);
    }

    getReportCount(form: GetReportCount): Promise<GetReportCountResponse> {
        return this.lemmy.getReportCount(form);
    }

    getSite(): Promise<GetSiteResponse> {
        return this.lemmy.getSite();
    }

    getSiteMetadata(form: GetSiteMetadata): Promise<GetSiteMetadataResponse> {
        return this.lemmy.getSiteMetadata(form);
    }

    getUnreadCount(): Promise<GetUnreadCountResponse> {
        return this.lemmy.getUnreadCount();
    }

    getUnreadRegistrationApplicationCount(): Promise<GetUnreadRegistrationApplicationCountResponse> {
        return this.lemmy.getUnreadRegistrationApplicationCount();
    }

    hideCommunity(form: HideCommunity): Promise <SuccessResponse> {
        return this.lemmy.hideCommunity(form);
    }
    
    importSettings(form: any): Promise<SuccessResponse> {
        return this.lemmy.importSettings(form);
    }

    leaveAdmin(): Promise<GetSiteResponse> {
        return this.lemmy.leaveAdmin();
    }
    
    likeComment(form: CreateCommentLike): Promise<CommentResponse> {
        return this.lemmy.likeComment(form);
    }

    likePost(form: CreatePostLike): Promise<PostResponse> {
        return this.lemmy.likePost(form)
    }
    
    listCommentReports(form: ListCommentReports): Promise<ListCommentReportsResponse> {
        return this.lemmy.listCommentReports(form);
    }

    listCommunities(form: ListCommunities = {}): Promise<ListCommunitiesResponse> {
        return this.lemmy.listCommunities(form)
    }
    
    listLogins(): Promise<LoginToken[]> {
        return this.lemmy.listLogins();
    }

    listPostReports(form: ListPostReports): Promise<ListPostReportsResponse> {
        return this.lemmy.listPostReports(form);
    }

    listPrivateMessageReports(form: ListPrivateMessageReports): Promise<ListPrivateMessageReportsResponse> {
        return this.lemmy.listPrivateMessageReports(form);
    }

    listRegistrationApplications(form: ListRegistrationApplications): Promise<ListRegistrationApplicationsResponse> {
        return this.lemmy.listRegistrationApplications(form);
    }

    lockPost(form: LockPost): Promise<PostResponse> {
        return this.lemmy.lockPost(form);
    }

    login(form: Login): Promise<LoginResponse> {
        return this.lemmy.login(form);
    }

    logout(): Promise<SuccessResponse> {
        return this.lemmy.logout();
    }

    markAllAsRead(): Promise<GetRepliesResponse> {
        return this.lemmy.markAllAsRead();
    }
    
    markCommentReplyAsRead(form: MarkCommentReplyAsRead): Promise<CommentReplyResponse> {
        return this.lemmy.markCommentReplyAsRead(form);
    }
    
    markPersonMentionAsRead(form: MarkPersonMentionAsRead): Promise<PersonMentionResponse> {
        return this.lemmy.markPersonMentionAsRead(form);
    }
    
    markPostAsRead(form: MarkPostAsRead): Promise<SuccessResponse> {
        return this.lemmy.markPostAsRead(form);
    }

    markPrivateMessageAsRead(form: MarkPrivateMessageAsRead): Promise<PrivateMessageResponse> {
        return this.lemmy.markPrivateMessageAsRead(form);
    }
    
    passwordChangeAfterReset(form: PasswordChangeAfterReset): Promise<SuccessResponse> {
        return this.lemmy.passwordChangeAfterReset(form);
    }
    
    passwordReset(form: PasswordReset): Promise<SuccessResponse> {
        return this.lemmy.passwordReset(form);
    }

    purgeComment(form: PurgeComment): Promise<SuccessResponse> {
        return this.lemmy.purgeComment(form);
    }

    purgeCommunity(form: PurgeCommunity): Promise<SuccessResponse> {
        return this.lemmy.purgeCommunity(form);
    }

    purgePerson(form: PurgePerson): Promise<SuccessResponse> {
        return this.lemmy.purgePerson(form);
    }

    purgePost(form: PurgePost): Promise<SuccessResponse> {
        return this.lemmy.purgePost(form);
    }

    register(form: Register): Promise<LoginResponse> {
        return this.lemmy.register(form)
    }

    removeComment(form: RemoveComment): Promise<CommentResponse> {
        return this.lemmy.removeComment(form);
    }

    removeCommunity(form: RemoveCommunity): Promise<CommunityResponse> {
        return this.lemmy.removeCommunity(form);
    }
   
    removePost(form: RemovePost): Promise<PostResponse> {
        return this.lemmy.removePost(form);
    }

    resolveCommentReport(form: ResolveCommentReport): Promise<CommentReportResponse> {
        return this.lemmy.resolveCommentReport(form);
    }

    resolveObject(form: ResolveObject): Promise<ResolveObjectResponse> {
        return this.lemmy.resolveObject(form);
    }

    resolvePostReport(form: ResolvePostReport): Promise<PostReportResponse> {
        return this.lemmy.resolvePostReport(form);
    }

    resolvePrivateMessageReport(form: ResolvePrivateMessageReport): Promise<PrivateMessageReportResponse> {
        return this.lemmy.resolvePrivateMessageReport(form);
    }
    
    saveComment(form: SaveComment): Promise<CommentResponse> {
        return this.lemmy.saveComment(form);
    }
    
    savePost(form: SavePost): Promise<PostResponse> {
        return this.lemmy.savePost(form);
    }

    saveUserSettings(form: SaveUserSettings): Promise<SuccessResponse> {
        return this.lemmy.saveUserSettings(form);
    }

    search(form: Search): Promise<SearchResponse> {
        return this.lemmy.search(form);
    }

    setHeaders(headers: { [key: string]: string }): void {
        this.lemmy.setHeaders(headers)
    }
    
    transferCommunity(form: TransferCommunity): Promise<GetCommunityResponse> {
        return this.lemmy.transferCommunity(form);
    }
    
    updateTotp(form: UpdateTotp): Promise<UpdateTotpResponse> {
        return this.lemmy.updateTotp(form);
    }

    uploadImage({ image }: UploadImage): Promise<UploadImageResponse> {
        return this.lemmy.uploadImage({image});
    }

    validateAuth(): Promise<SuccessResponse> {
        return this.lemmy.validateAuth();
    }

    verifyEmail(form: VerifyEmail): Promise<SuccessResponse> {
        return this.lemmy.verifyEmail(form);
    }


}