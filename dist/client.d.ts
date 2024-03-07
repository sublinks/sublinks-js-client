import { HeadersObject } from './types/HeadersObject';
import { HttpClientConstructorOptions } from './types/HttpClientConstructorOptions';
import type { AddAdmin, AddAdminResponse, AddModToCommunity, AddModToCommunityResponse, ApproveRegistrationApplication, BanFromCommunity, BanFromCommunityResponse, BanPerson, BanPersonResponse, BannedPersonsResponse, BlockCommunity, BlockCommunityResponse, BlockInstance, BlockInstanceResponse, BlockPerson, BlockPersonResponse, ChangePassword, CommentResponse, CommentReplyResponse, CommentReportResponse, CommunityResponse, CreateComment, CreateCommentLike, CreateCommentReport, CreateCommunity, CreateCustomEmoji, CreatePost, CreatePostLike, CreatePostReport, CreatePrivateMessage, CreatePrivateMessageReport, CreateSite, CustomEmojiResponse, DeleteAccount, DeleteComment, DeleteCommunity, DeleteCustomEmoji, DeleteImage, DeletePost, DeletePrivateMessage, DistinguishComment, EditComment, EditCommunity, EditCustomEmoji, EditPost, EditPrivateMessage, EditSite, FeaturePost, FollowCommunity, GenerateTotpSecretResponse, GetCaptchaResponse, GetComment, GetComments, GetCommentsResponse, GetCommunity, GetCommunityResponse, GetFederatedInstancesResponse, GetModlog, GetModlogResponse, GetPersonDetails, GetPersonDetailsResponse, GetPersonMentions, GetPersonMentionsResponse, GetPost, GetPostResponse, GetPosts, GetPostsResponse, GetPrivateMessages, GetReplies, GetRepliesResponse, GetReportCount, GetReportCountResponse, GetSiteMetadata, GetSiteMetadataResponse, GetSiteResponse, GetUnreadCountResponse, GetUnreadRegistrationApplicationCountResponse, HideCommunity, ListCommentReports, ListCommentReportsResponse, ListCommunities, ListCommunitiesResponse, ListPostReports, ListPostReportsResponse, ListPrivateMessageReports, ListPrivateMessageReportsResponse, ListRegistrationApplications, ListRegistrationApplicationsResponse, LockPost, Login, LoginResponse, LoginToken, MarkCommentReplyAsRead, MarkPersonMentionAsRead, MarkPostAsRead, MarkPrivateMessageAsRead, PasswordChangeAfterReset, PasswordReset, PersonMentionResponse, PostResponse, PostReportResponse, PrivateMessageResponse, PrivateMessagesResponse, PrivateMessageReportResponse, PurgeComment, PurgeCommunity, PurgePerson, PurgePost, Register, RegistrationApplicationResponse, RemoveComment, RemoveCommunity, RemovePost, ResolveCommentReport, ResolveObject, ResolveObjectResponse, ResolvePostReport, ResolvePrivateMessageReport, SaveComment, SavePost, SaveUserSettings, Search, SearchResponse, SiteResponse, SuccessResponse, TransferCommunity, UpdateTotp, UpdateTotpResponse, UploadImage, UploadImageResponse, VerifyEmail } from 'lemmy-js-client';
import type { CacheOptions } from './types/argumentTypes/CacheOptions';
import type { StatusResponse } from './types/StatusResponse';
import { FetchCache } from './cache';
import { LemmyHttp } from 'lemmy-js-client';
import { SublinksHttp } from './native-client';
/**
 * Universal Sublinks/Lemmy client that works with both APIs
*/
export declare class SublinksClient {
    baseURL: string;
    instance: string;
    native: SublinksHttp;
    lemmy: LemmyHttp;
    headers: HeadersObject;
    cache: FetchCache;
    /**
     * Client library for Sublinks and, during compatibility phase, Lemmy.
     *
     * @param instance should be the domain of the instance without the scheme (e.g. sublinks.example.com).  HTTPS is assumed and enforced by the library.
     * @param options is an object of type HttpClientConstructorOptions
    */
    constructor(instance: string, options?: HttpClientConstructorOptions);
    /** Returns the current date/time as a Unix timestamp rounded down to nearest second. */
    now(): number;
    /** Fetches and returns the version of the native API */
    apiVersion(): Promise<StatusResponse>;
    addAdmin(form: AddAdmin): Promise<AddAdminResponse>;
    addModToCommunity(form: AddModToCommunity): Promise<AddModToCommunityResponse>;
    approveRegistrationApplication(form: ApproveRegistrationApplication): Promise<RegistrationApplicationResponse>;
    banFromCommunity(form: BanFromCommunity): Promise<BanFromCommunityResponse>;
    banPerson(form: BanPerson): Promise<BanPersonResponse>;
    blockCommunity(form: BlockCommunity): Promise<BlockCommunityResponse>;
    blockInstance(form: BlockInstance): Promise<BlockInstanceResponse>;
    blockPerson(form: BlockPerson): Promise<BlockPersonResponse>;
    changePassword(form: ChangePassword): Promise<LoginResponse>;
    createComment(form: CreateComment): Promise<CommentResponse>;
    createCommentReport(form: CreateCommentReport): Promise<CommentReportResponse>;
    createCommunity(form: CreateCommunity): Promise<CommunityResponse>;
    createCustomEmoji(form: CreateCustomEmoji): Promise<CustomEmojiResponse>;
    createPost(form: CreatePost): Promise<PostResponse>;
    createPostReport(form: CreatePostReport): Promise<PostReportResponse>;
    createPrivateMessage(form: CreatePrivateMessage): Promise<PrivateMessageResponse>;
    createPrivateMessageReport(form: CreatePrivateMessageReport): Promise<PrivateMessageReportResponse>;
    createSite(form: CreateSite): Promise<SiteResponse>;
    deleteAccount(form: DeleteAccount): Promise<SuccessResponse>;
    deleteComment(form: DeleteComment): Promise<CommentResponse>;
    deleteCommunity(form: DeleteCommunity): Promise<CommunityResponse>;
    deleteCustomEmoji(form: DeleteCustomEmoji): Promise<SuccessResponse>;
    deleteImage({ token, filename }: DeleteImage): Promise<boolean>;
    deletePost(form: DeletePost): Promise<PostResponse>;
    deletePrivateMessage(form: DeletePrivateMessage): Promise<PrivateMessageResponse>;
    distinguishComment(form: DistinguishComment): Promise<CommentResponse>;
    editComment(form: EditComment): Promise<CommentResponse>;
    editCommunity(form: EditCommunity): Promise<CommunityResponse>;
    editCustomEmoji(form: EditCustomEmoji): Promise<CustomEmojiResponse>;
    editPost(form: EditPost): Promise<PostResponse>;
    editPrivateMessage(form: EditPrivateMessage): Promise<PrivateMessageResponse>;
    editSite(form: EditSite): Promise<SiteResponse>;
    exportSettings(): Promise<any>;
    featurePost(form: FeaturePost): Promise<PostResponse>;
    followCommunity(form: FollowCommunity): Promise<CommunityResponse>;
    generateTotpSecret(): Promise<GenerateTotpSecretResponse>;
    getBannedPersons(): Promise<BannedPersonsResponse>;
    getCaptcha(): Promise<GetCaptchaResponse>;
    getComment(form: GetComment): Promise<CommentResponse>;
    getComments(form?: GetComments): Promise<GetCommentsResponse>;
    getCommunity(form?: GetCommunity, cacheOptions?: CacheOptions): Promise<GetCommunityResponse>;
    getFederatedInstances(cacheOptions?: CacheOptions): Promise<GetFederatedInstancesResponse>;
    getModlog(form?: GetModlog, cacheOptions?: CacheOptions): Promise<GetModlogResponse>;
    getPersonDetails(form?: GetPersonDetails): Promise<GetPersonDetailsResponse>;
    getPersonMentions(form: GetPersonMentions): Promise<GetPersonMentionsResponse>;
    getPost(form?: GetPost): Promise<GetPostResponse>;
    getPosts(form?: GetPosts): Promise<GetPostsResponse>;
    getPrivateMessages(form: GetPrivateMessages): Promise<PrivateMessagesResponse>;
    getReplies(form: GetReplies): Promise<GetRepliesResponse>;
    getReportCount(form: GetReportCount): Promise<GetReportCountResponse>;
    /** Gets the site info and optionally caches it.
     * @param options   Options to control the cache behavior
    **/
    getSite(cacheOptions?: CacheOptions): Promise<GetSiteResponse>;
    getSiteMetadata(form: GetSiteMetadata): Promise<GetSiteMetadataResponse>;
    getUnreadCount(): Promise<GetUnreadCountResponse>;
    getUnreadRegistrationApplicationCount(): Promise<GetUnreadRegistrationApplicationCountResponse>;
    hideCommunity(form: HideCommunity): Promise<SuccessResponse>;
    importSettings(form: any): Promise<SuccessResponse>;
    leaveAdmin(): Promise<GetSiteResponse>;
    likeComment(form: CreateCommentLike): Promise<CommentResponse>;
    likePost(form: CreatePostLike): Promise<PostResponse>;
    listCommentReports(form: ListCommentReports): Promise<ListCommentReportsResponse>;
    listCommunities(form?: ListCommunities): Promise<ListCommunitiesResponse>;
    listLogins(): Promise<LoginToken[]>;
    listPostReports(form: ListPostReports): Promise<ListPostReportsResponse>;
    listPrivateMessageReports(form: ListPrivateMessageReports): Promise<ListPrivateMessageReportsResponse>;
    listRegistrationApplications(form: ListRegistrationApplications): Promise<ListRegistrationApplicationsResponse>;
    lockPost(form: LockPost): Promise<PostResponse>;
    login(form: Login): Promise<LoginResponse>;
    logout(): Promise<SuccessResponse>;
    markAllAsRead(): Promise<GetRepliesResponse>;
    markCommentReplyAsRead(form: MarkCommentReplyAsRead): Promise<CommentReplyResponse>;
    markPersonMentionAsRead(form: MarkPersonMentionAsRead): Promise<PersonMentionResponse>;
    markPostAsRead(form: MarkPostAsRead): Promise<SuccessResponse>;
    markPrivateMessageAsRead(form: MarkPrivateMessageAsRead): Promise<PrivateMessageResponse>;
    passwordChangeAfterReset(form: PasswordChangeAfterReset): Promise<SuccessResponse>;
    passwordReset(form: PasswordReset): Promise<SuccessResponse>;
    purgeComment(form: PurgeComment): Promise<SuccessResponse>;
    purgeCommunity(form: PurgeCommunity): Promise<SuccessResponse>;
    purgePerson(form: PurgePerson): Promise<SuccessResponse>;
    purgePost(form: PurgePost): Promise<SuccessResponse>;
    register(form: Register): Promise<LoginResponse>;
    removeComment(form: RemoveComment): Promise<CommentResponse>;
    removeCommunity(form: RemoveCommunity): Promise<CommunityResponse>;
    removePost(form: RemovePost): Promise<PostResponse>;
    resolveCommentReport(form: ResolveCommentReport): Promise<CommentReportResponse>;
    resolveObject(form: ResolveObject): Promise<ResolveObjectResponse>;
    resolvePostReport(form: ResolvePostReport): Promise<PostReportResponse>;
    resolvePrivateMessageReport(form: ResolvePrivateMessageReport): Promise<PrivateMessageReportResponse>;
    saveComment(form: SaveComment): Promise<CommentResponse>;
    savePost(form: SavePost): Promise<PostResponse>;
    saveUserSettings(form: SaveUserSettings): Promise<SuccessResponse>;
    search(form: Search): Promise<SearchResponse>;
    /**
     * Convenience method to set the `Authorization: Bearer {token}` header
    */
    setAuth(jwt: string): void;
    /**
     * Sets an individual header key to the provided value or removes the key from the headers if a value is not provided.
     * Then calls `setHeaders` with the updated headers object.
    */
    setHeader(key: string, value?: string): void;
    setHeaders(headers: {
        [key: string]: string;
    }): void;
    transferCommunity(form: TransferCommunity): Promise<GetCommunityResponse>;
    updateTotp(form: UpdateTotp): Promise<UpdateTotpResponse>;
    uploadImage({ image }: UploadImage): Promise<UploadImageResponse>;
    validateAuth(): Promise<SuccessResponse>;
    verifyEmail(form: VerifyEmail): Promise<SuccessResponse>;
}
