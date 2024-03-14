import { HeadersObject } from './types/HeadersObject'
import { HttpClientConstructorOptions } from './types/HttpClientConstructorOptions'

enum HTTPVerb {
    GET,
    POST,
    PUT,
    OPTIONS,
    DELETE,
    PATCH
}
//import { fetch } from 'cross-fetch'

// Import Lemmy types
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
    ListCommentLikes,
    ListCommentLikesResponse,
    ListCommentReports,
    ListCommentReportsResponse,
    ListCommunities,
    ListCommunitiesResponse,
    ListPostLikes,
    ListPostLikesResponse,
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
} from './types/lemmy/index'




// Import Native Types
import type { CacheOptions } from './types/argumentTypes/CacheOptions'
import type { StatusResponse } from './types/StatusResponse'
import type { SublinksClientCache } from './types/SublinksClientCache'

import { FetchCache } from './cache'

/**
 * Universal Sublinks/Lemmy client that works with both APIs
*/
export class SublinksClient {
    baseURL: string             // Base URL of the API (https://instance.example.com)
    instance: string
    headers: HeadersObject      // Key-value object store for HTTP headers the client will send to the API server.
    cache: FetchCache           
    fetchFunction = fetch       // Allows overriding native fetch with something like cross-fetch

    /** 
     * Client library for Sublinks and, during compatibility phase, Lemmy.
     * 
     * @param instance should be the domain of the instance without the scheme (e.g. sublinks.example.com).  HTTPS is assumed and enforced by the library.
     * @param options is an object of type HttpClientConstructorOptions
    */
    constructor( instance: string, options?: HttpClientConstructorOptions) {
        
        // Strip scheme and anything except the hostname if provided
        this.instance = instance
        
        if (instance.startsWith('https://') || instance.startsWith('http://')) {
            this.instance = new URL(instance).host;
        }
        
        let scheme      = options?.insecure ? 'http://' : 'https://'
        this.headers    = options?.headers || {}
        this.baseURL    = `${scheme}${this.instance}`
        this.cache      = new FetchCache(options?.cacheTime ?? 60, options?.useCache ?? true)

        if ( options?.fetchFunction) this.fetchFunction = options.fetchFunction
    }

    /** Standard fetch wrapper for native API calls. 
    * 
    * ResponseType is the type definition to expect from the response. 
     
    * FormDataType is the type definition for the `form` parameter data
    
    * Note:  These are reversed from how Lemmy's wrapper function is implemented to allow shorter invocations for GET requests by not requiring a dummy 'object' type be passed for the non-existent form data when not needed.
     
    * 
    * @param method    HTTP method to use for the call
    * @param endpoint  The relative API endpoint (e.g. /siteinfo -> https://{instance.com}/sublinks-api/v2/siteinfo)
    * @param form      The optional body payload for non-GET requests or key/values for GET query string params
    */
    async call <ResponseType, FormDataType extends object = object> (method: HTTPVerb, endpoint: string, form: FormDataType = {} as FormDataType): Promise<ResponseType> {
        const url = new URL(this.baseURL);
        url.pathname += `${endpoint}`;
        
        let response: Response 
        let json: any
        
        console.log(`Calling ${method} - ${url}`)
        
        try {
            if (method == HTTPVerb.GET) {
                if (form) {
                    let keys = Object.keys(form);
                    keys.forEach((key:string) => {
                        let value = (form as any)[key] as string;
                        url.searchParams.set(key, value)
                    })
                }
                console.log(url)
                response = await this.fetchFunction(url, {
                    method: HTTPVerb[method],
                    headers: this.headers,
                });
            }
            else {
                response = await this.fetchFunction(url, {
                    method: HTTPVerb[method],
                    headers: {
                        'Content-Type': 'application/json',
                        ...this.headers,
                    },
                    body: JSON.stringify(form)
                });
            }

            if (response.ok) {
                json = await response.json();
            }
            else {
                throw new Error(response.statusText ?? "Bad API response");
            }
        }

        catch (err) {
            throw new Error(err);
        }

        return json;
    }

    // Utility Functions
    /** Returns the current date/time as a Unix timestamp rounded down to nearest second. */
    now(): number {
        return Math.floor(new Date().getTime()/1000)
    }


    // Lemmy API Compatibility Wrappers

    addAdmin(form: AddAdmin): Promise<AddAdminResponse>  {
        return this.call <AddAdminResponse, AddAdmin>(HTTPVerb.POST, 'api/v3/admin/add', form)
    }

    addModToCommunity(form: AddModToCommunity): Promise<AddModToCommunityResponse> {
        return this.call <AddModToCommunityResponse, AddModToCommunity> (HTTPVerb.POST, 'api/v3/community/mod', form)
    }

    approveRegistrationApplication(form: ApproveRegistrationApplication): Promise<RegistrationApplicationResponse> {
        return this.call <RegistrationApplicationResponse, ApproveRegistrationApplication>( HTTPVerb.PUT, 'api/v3/admin/registration_application/approve', form)
    }

    banFromCommunity(form: BanFromCommunity): Promise<BanFromCommunityResponse> {
        return this.call <BanFromCommunityResponse, BanFromCommunity> (HTTPVerb.POST, 'api/v3/community/ban_user', form)
    }

    banPerson(form: BanPerson): Promise<BanPersonResponse> {
        return this.call <BanPersonResponse, BanPerson> (HTTPVerb.POST, 'api/v3/user/ban', form)
    }

    blockCommunity(form: BlockCommunity): Promise<BlockCommunityResponse> {
        return this.call <BlockCommunityResponse, BlockCommunity> (HTTPVerb.POST, 'api/v3/community/block', form)
    }
    
    blockInstance(form: BlockInstance): Promise<BlockInstanceResponse> {
        return this.call <BlockInstanceResponse,BlockInstance> (HTTPVerb.POST, 'api/v3/site/block', form)
    }

    blockPerson(form: BlockPerson): Promise<BlockPersonResponse> {
        return this.call <BlockPersonResponse, BlockPerson> (HTTPVerb.POST, 'api/v3/user/block', form)
    }
    
    changePassword(form: ChangePassword): Promise<LoginResponse> {
        return this.call <LoginResponse, ChangePassword> (HTTPVerb.PUT, 'api/v3/user/change_password', form)
    }

    createComment(form: CreateComment): Promise<CommentResponse> {
        return this.call <CommentResponse, CreateComment> (HTTPVerb.POST, 'api/v3/comment', form)
    }

    createCommentReport(form: CreateCommentReport): Promise<CommentReportResponse> {
        return this.call <CommentReportResponse, CreateCommentReport> (HTTPVerb.POST, 'api/v3/comment/report', form)
    }

    createCommunity(form: CreateCommunity): Promise<CommunityResponse> {
        return this.call <CommunityResponse, CreateCommunity> (HTTPVerb.POST, 'api/v3/community', form)
    }

    createCustomEmoji(form: CreateCustomEmoji): Promise<CustomEmojiResponse> {
        return this.call <CustomEmojiResponse, CreateCustomEmoji> (HTTPVerb.POST, 'api/v3/custom_emoji', form)
    }
    
    createPost(form: CreatePost): Promise<PostResponse> {
        return this.call <PostResponse, CreatePost> (HTTPVerb.POST, 'api/v3/post', form)
    }

    createPostReport(form: CreatePostReport): Promise<PostReportResponse> {
        return this.call <PostReportResponse, CreatePostReport> (HTTPVerb.POST, 'api/v3/post/report', form)
    }

    createPrivateMessage(form: CreatePrivateMessage): Promise<PrivateMessageResponse> {
        return this.call <PrivateMessageResponse, CreatePrivateMessage> (HTTPVerb.POST, 'api/v3/private_message', form)
    }

    createPrivateMessageReport(form: CreatePrivateMessageReport): Promise<PrivateMessageReportResponse> {
        return this.call <PrivateMessageReportResponse, CreatePrivateMessageReport> (HTTPVerb.POST, 'api/v3/private_message/report', form)
    }

    createSite(form: CreateSite): Promise<SiteResponse> {
        return this.call <SiteResponse, CreateSite> (HTTPVerb.POST, 'api/v3/site', form)
    }

    deleteAccount(form: DeleteAccount): Promise<SuccessResponse> {
        return this.call <SuccessResponse, DeleteAccount> (HTTPVerb.POST, 'api/v3/user/delete_account', form)
    }

    deleteComment(form: DeleteComment): Promise<CommentResponse> {
        return this.call <CommentResponse, DeleteComment> (HTTPVerb.POST, 'api/v3/comment/delete', form)
    }

    deleteCommunity(form: DeleteCommunity): Promise<CommunityResponse> {
        return this.call <CommunityResponse, DeleteCommunity> (HTTPVerb.POST, 'api/v3/community/delete', form)
    }

    deleteCustomEmoji(form: DeleteCustomEmoji): Promise<SuccessResponse> {
        return this.call <SuccessResponse, DeleteCustomEmoji> (HTTPVerb.POST, 'api/v3/custom_emoji/delete', form)
    }

    // This *should* work, but the way the Lemmy devs aren't even bothering to handle this internally is stupid.
    deleteImage({ token, filename }: DeleteImage): Promise<boolean> {
        return this.call <boolean, DeleteImage> (HTTPVerb.GET, `pictrs/delete/${token}/${filename}`)
    }

    deletePost(form: DeletePost): Promise<PostResponse> {
        return this.call <PostResponse, DeletePost> (HTTPVerb.POST, 'api/v3/post/delete', form)
    }

    deletePrivateMessage(form: DeletePrivateMessage): Promise<PrivateMessageResponse> {
        return this.call <PrivateMessageResponse, DeletePrivateMessage> (HTTPVerb.POST, 'api/v3/private_message/delete', form)
    }
    
    distinguishComment(form: DistinguishComment): Promise<CommentResponse> {
        return this.call <CommentResponse, DistinguishComment> (HTTPVerb.POST, 'api/v3/comment/distinguish', form)
    }

    editComment(form: EditComment): Promise<CommentResponse> {
        return this.call <CommentResponse, EditComment> (HTTPVerb.PUT, 'api/v3/comment', form)
    }

    editCommunity(form: EditCommunity): Promise<CommunityResponse> {
        return this.call <CommunityResponse, EditCommunity> (HTTPVerb.PUT, 'api/v3/community', form)
    }

    editCustomEmoji(form: EditCustomEmoji): Promise<CustomEmojiResponse> {
        return this.call <CustomEmojiResponse, EditCustomEmoji> (HTTPVerb.PUT,'api/v3/custom_emoji', form)
    }

    editPost(form: EditPost): Promise<PostResponse> {
        return this.call <PostResponse, EditPost> (HTTPVerb.PUT, 'api/v3/post', form)
    }

    editPrivateMessage(form: EditPrivateMessage): Promise<PrivateMessageResponse> {
        return this.call <PrivateMessageResponse, EditPrivateMessage> (HTTPVerb.PUT, 'api/v3/private_message', form)
    }

    editSite(form: EditSite): Promise<SiteResponse> {
        return this.call <SiteResponse, EditSite> (HTTPVerb.PUT, 'api/v3/site', form)
    }

    exportSettings():Promise<string> {
        return this.call <string> (HTTPVerb.GET, 'api/v3/user/export_settings')
    }
    
    featurePost(form: FeaturePost): Promise<PostResponse> {
        return this.call <PostResponse, FeaturePost> (HTTPVerb.POST, 'api/v3/post/feature', form)
    }

    followCommunity(form: FollowCommunity):Promise<CommunityResponse> {
        return this.call <CommunityResponse, FollowCommunity> (HTTPVerb.POST, 'api/v3/community/follow', form)
    }

    generateTotpSecret(): Promise<GenerateTotpSecretResponse> {
        return this.call <GenerateTotpSecretResponse> (HTTPVerb.POST, 'api/v3/user/totp/generate')
    }
    
    getBannedPersons(): Promise<BannedPersonsResponse> {
        return this.call <BannedPersonsResponse> (HTTPVerb.GET, 'api/v3/user/banned')
    }

    getCaptcha(): Promise<GetCaptchaResponse> {
        return this.call <GetCaptchaResponse> (HTTPVerb.GET, 'api/v3/user/get_captcha')
    }

    getComment(form: GetComment): Promise<CommentResponse> {
        return this.call <CommentResponse, GetComment> (HTTPVerb.GET, 'api/v3/comment', form)
    }

    getComments(form: GetComments = {}): Promise<GetCommentsResponse> {
        return this.call <GetCommentsResponse, GetComments> (HTTPVerb.GET, 'api/v3/comment/list', form)
    }
    
    async getCommunity(form: GetCommunity = {}, cacheOptions?: CacheOptions):Promise<GetCommunityResponse> {
        if (!form.id && !form.name) return {} as GetCommunityResponse

        const cacheKey = this.cache.cacheKey("getCommunity", form);
        return this.cache.get<GetCommunityResponse>(cacheKey, cacheOptions) 
            ?? this.cache.put<GetCommunityResponse>(cacheKey, await this.call <GetCommunityResponse, GetCommunity> (HTTPVerb.GET, 'api/v3/community', form), cacheOptions)
    }

    async getFederatedInstances(cacheOptions?: CacheOptions): Promise<GetFederatedInstancesResponse> {
        const cacheKey = "getFederatedInstances"
        
        return this.cache.get<GetFederatedInstancesResponse>(cacheKey, cacheOptions) 
            ?? this.cache.put<GetFederatedInstancesResponse>(cacheKey, await this.call <GetFederatedInstancesResponse> (HTTPVerb.GET, 'api/v3/federated_instances'), cacheOptions)
    }

    async getModlog(form: GetModlog = {}, cacheOptions?: CacheOptions): Promise<GetModlogResponse> {
        const cacheKey = this.cache.cacheKey("getModlog", form)

        return this.cache.get<GetModlogResponse>(cacheKey, cacheOptions) 
            ?? this.cache.put<GetModlogResponse>(cacheKey, await this.call <GetModlogResponse, GetModlog> (HTTPVerb.GET, 'api/v3/modlog', form), cacheOptions)
        
    }

    async getPersonDetails(form: GetPersonDetails = {}, cacheOptions?: CacheOptions): Promise<GetPersonDetailsResponse> {
        const cacheKey = this.cache.cacheKey("getPersonDetails", form)

        return this.cache.get<GetPersonDetailsResponse>(cacheKey, cacheOptions) 
            ?? this.cache.put<GetPersonDetailsResponse>(cacheKey, await this.call <GetPersonDetailsResponse, GetPersonDetails> (HTTPVerb.GET, 'api/v3/user', form), cacheOptions)
    }

    getPersonMentions(form: GetPersonMentions): Promise<GetPersonMentionsResponse> {
        return this.call <GetPersonMentionsResponse, GetPersonMentions> (HTTPVerb.GET, 'api/v3/user/mention', form)
    }

    getPost(form: GetPost = {}): Promise<GetPostResponse> {
        return this.call <GetPostResponse, GetPost> (HTTPVerb.GET, 'api/v3/post', form)
    }

    getPosts(form: GetPosts = {}): Promise<GetPostsResponse> {
        return this.call <GetPostsResponse, GetPosts> (HTTPVerb.GET, 'api/v3/post/list', form)
    }

    getPrivateMessages(form: GetPrivateMessages): Promise<PrivateMessagesResponse> {
        return this.call <PrivateMessagesResponse, GetPrivateMessages> (HTTPVerb.GET, 'api/v3/private_message/list', form)
    }

    getReplies(form: GetReplies): Promise<GetRepliesResponse> {
        return this.call <GetRepliesResponse, GetReplies> (HTTPVerb.GET, 'api/v3/user/replies', form)
    }

    getReportCount(form: GetReportCount): Promise<GetReportCountResponse> {
        return this.call <GetReportCountResponse, GetReportCount> (HTTPVerb.GET, 'api/v3/user/report_count', form)
    }

    /** Gets the site info and optionally caches it. 
     * @param options   Options to control the cache behavior
    **/
    async getSite(cacheOptions?: CacheOptions): Promise<GetSiteResponse> {
        return this.cache.get<GetSiteResponse>('getSite', cacheOptions) 
            ?? this.cache.put<GetSiteResponse>('getSite', await this.call <GetSiteResponse>(HTTPVerb.GET, 'api/v3/site'), cacheOptions)
    }

    getSiteMetadata(form: GetSiteMetadata): Promise<GetSiteMetadataResponse> {
        return this.call <GetSiteMetadataResponse, GetSiteMetadata> (HTTPVerb.GET, 'api/v3/post/site_metadata', form)
    }

    getUnreadCount(): Promise<GetUnreadCountResponse> {
        return this.call <GetUnreadCountResponse> (HTTPVerb.GET, 'api/v3/user/unread_count')
    }

    getUnreadRegistrationApplicationCount(): Promise<GetUnreadRegistrationApplicationCountResponse> {
        return this.call <GetUnreadRegistrationApplicationCountResponse> (HTTPVerb.GET, 'api/v3/admin/registration_application/count')
    }

    hideCommunity(form: HideCommunity): Promise <SuccessResponse> {
        return this.call <SuccessResponse, HideCommunity> (HTTPVerb.PUT, 'api/v3/community/hide', form)
    }
    
    importSettings(form: any): Promise<SuccessResponse> {
        return this.call <SuccessResponse, any> (HTTPVerb.POST, 'api/v3/user/import_settings', form)
    }

    leaveAdmin(): Promise<GetSiteResponse> {
        return this.call <GetSiteResponse> (HTTPVerb.POST, 'api/v3/user/leave_admin')
    }
    
    likeComment(form: CreateCommentLike): Promise<CommentResponse> {
        return this.call <CommentResponse, CreateCommentLike> (HTTPVerb.POST, 'api/v3/comment/like', form)
    }

    likePost(form: CreatePostLike): Promise<PostResponse> {
        return this.call <PostResponse, CreatePostLike> (HTTPVerb.POST, 'api/v3/post/like', form)
    }

    listCommentLikes(form: ListCommentLikes): Promise<ListCommentLikesResponse> {
        return this.call <ListCommentLikesResponse, ListCommentLikes> (HTTPVerb.GET, 'api/v3/like', form)
    }
    
    listCommentReports(form: ListCommentReports): Promise<ListCommentReportsResponse> {
        return this.call <ListCommentReportsResponse, ListCommentReports> (HTTPVerb.GET, 'api/v3/comment/report/list', form)
    }

    listCommunities(form: ListCommunities = {}): Promise<ListCommunitiesResponse> {
        return this.call <ListCommunitiesResponse, ListCommunities> (HTTPVerb.GET, 'api/v3/community/list', form)
    }
    
    listLogins(): Promise<LoginToken[]> {
        return this.call <LoginToken[]> (HTTPVerb.GET, 'api/v3/user/list_logins')
    }

    listPostLikes(form: ListPostLikes): Promise<ListPostLikesResponse> {
        return this.call <ListPostLikesResponse, ListPostLikes> (HTTPVerb.GET, 'api/v3/post/like', form)
    }

    listPostReports(form: ListPostReports): Promise<ListPostReportsResponse> {
        return this.call <ListPostReportsResponse, ListPostReports> (HTTPVerb.GET, 'api/v3/post/report/list', form)
    }

    listPrivateMessageReports(form: ListPrivateMessageReports): Promise<ListPrivateMessageReportsResponse> {
        return this.call <ListPrivateMessageReportsResponse, ListPrivateMessageReports> (HTTPVerb.GET, 'api/v3/private_message/report/list', form)
    }

    listRegistrationApplications(form: ListRegistrationApplications): Promise<ListRegistrationApplicationsResponse> {
        return this.call <ListRegistrationApplicationsResponse, ListRegistrationApplications> (HTTPVerb.GET, 'api/v3/admin/registration_application/list', form)
    }

    lockPost(form: LockPost): Promise<PostResponse> {
        return this.call <PostResponse, LockPost> (HTTPVerb.POST, 'api/v3/post/lock', form)
    }

    login(form: Login): Promise<LoginResponse> {
        return this.call <LoginResponse, Login> (HTTPVerb.POST, 'api/v3/user/login', form)
    }

    logout(): Promise<SuccessResponse> {
        return this.call <SuccessResponse> (HTTPVerb.POST, 'api/v3/user/logout')
    }

    markAllAsRead(): Promise<GetRepliesResponse> {
        return this.call <GetRepliesResponse> (HTTPVerb.POST, 'api/v3/user/mark_all_as_read')
    }
    
    markCommentReplyAsRead(form: MarkCommentReplyAsRead): Promise<CommentReplyResponse> {
        return this.call <CommentReplyResponse, MarkCommentReplyAsRead> (HTTPVerb.POST, 'api/v3/comment/mark_as_read', form)
    }
    
    markPersonMentionAsRead(form: MarkPersonMentionAsRead): Promise<PersonMentionResponse> {
        return this.call <PersonMentionResponse, MarkPersonMentionAsRead> (HTTPVerb.POST, 'api/v3/user/mention/mark_as_read', form)
    }
    
    markPostAsRead(form: MarkPostAsRead): Promise<SuccessResponse> {
        return this.call <SuccessResponse, MarkPostAsRead> (HTTPVerb.POST, 'api/v3/post/mark_as_read', form)
    }

    markPrivateMessageAsRead(form: MarkPrivateMessageAsRead): Promise<PrivateMessageResponse> {
        return this.call <PrivateMessageResponse, MarkPrivateMessageAsRead> (HTTPVerb.POST, 'api/v3/private_message/mark_as_read', form)
    }
    
    passwordChangeAfterReset(form: PasswordChangeAfterReset): Promise<SuccessResponse> {
        return this.call <SuccessResponse, PasswordChangeAfterReset> (HTTPVerb.POST, 'api/v3/user/password_change', form)
    }
    
    passwordReset(form: PasswordReset): Promise<SuccessResponse> {
        return this.call <SuccessResponse, PasswordReset> (HTTPVerb.POST, 'api/v3/user/password_reset', form)
    }

    purgeComment(form: PurgeComment): Promise<SuccessResponse> {
        return this.call <SuccessResponse, PurgeComment> (HTTPVerb.POST, 'api/v3/admin/purge/comment', form)
    }

    purgeCommunity(form: PurgeCommunity): Promise<SuccessResponse> {
        return this.call <SuccessResponse, PurgeCommunity> (HTTPVerb.POST, 'api/v3/admin/purge/community', form)
    }

    purgePerson(form: PurgePerson): Promise<SuccessResponse> {
        return this.call <SuccessResponse, PurgePerson> (HTTPVerb.POST, 'api/v3/admin/purge/person', form)
    }

    purgePost(form: PurgePost): Promise<SuccessResponse> {
        return this.call <SuccessResponse, PurgePost> (HTTPVerb.POST, 'api/v3/admin/purge/post', form)
    }

    register(form: Register): Promise<LoginResponse> {
        return this.call <LoginResponse, Register> (HTTPVerb.POST, 'api/v3/user/register', form)
    }

    removeComment(form: RemoveComment): Promise<CommentResponse> {
        return this.call <CommentResponse, RemoveComment> (HTTPVerb.POST, 'api/v3/comment/remove', form)
    }

    removeCommunity(form: RemoveCommunity): Promise<CommunityResponse> {
        return this.call <CommunityResponse, RemoveCommunity> (HTTPVerb.POST, 'api/v3/community/remove', form)
    }
   
    removePost(form: RemovePost): Promise<PostResponse> {
        return this.call <PostResponse, RemovePost> (HTTPVerb.POST, 'api/v3/post/remove', form)
    }

    resolveCommentReport(form: ResolveCommentReport): Promise<CommentReportResponse> {
        return this.call <CommentReportResponse, ResolveCommentReport> (HTTPVerb.PUT, 'api/v3/comment/report/resolve', form)
    }

    resolveObject(form: ResolveObject): Promise<ResolveObjectResponse> {
        return this.call <ResolveObjectResponse, ResolveObject> (HTTPVerb.GET, 'api/v3/resolve_object', form)
    }

    resolvePostReport(form: ResolvePostReport): Promise<PostReportResponse> {
        return this.call <PostReportResponse, ResolvePostReport> (HTTPVerb.PUT, 'api/v3/post/report/resolve', form)
    }

    resolvePrivateMessageReport(form: ResolvePrivateMessageReport): Promise<PrivateMessageReportResponse> {
        return this.call <PrivateMessageReportResponse, ResolvePrivateMessageReport> (HTTPVerb.PUT, 'api/v3/private_message/report/resolve', form)
    }
    
    saveComment(form: SaveComment): Promise<CommentResponse> {
        return this.call <CommentResponse, SaveComment> (HTTPVerb.PUT, 'api/v3/comment/save', form)
    }
    
    savePost(form: SavePost): Promise<PostResponse> {
        return this.call <PostResponse, SavePost> (HTTPVerb.PUT, 'api/v3/post/save', form)
    }

    saveUserSettings(form: SaveUserSettings): Promise<SuccessResponse> {
        return this.call <SuccessResponse, SaveUserSettings> (HTTPVerb.PUT, 'api/v3/user/save_user_settings', form)
    }

    search(form: Search): Promise<SearchResponse> {
        return this.call <SearchResponse, Search> (HTTPVerb.GET, 'api/v3/search', form)
    }

    /**
     * Convenience method to set the `Authorization: Bearer {token}` header
    */
    setAuth(jwt: string): void {
        this.setHeader("Authorization", `Bearer ${jwt}`);
    }

    /**
     * Sets an individual header key to the provided value or removes the key from the headers if a value is not provided.
     * Then calls `setHeaders` with the updated headers object.
    */
    setHeader(key:string, value?:string): void {
        if (value) this.headers[key] = value;
        else if (this.headers[key]) delete this.headers[key];

        this.setHeaders(this.headers);
    }

    setHeaders(headers: { [key: string]: string }): void {
        this.headers = headers
    }
    
    transferCommunity(form: TransferCommunity): Promise<GetCommunityResponse> {
        return this.call <GetCommunityResponse, TransferCommunity> (HTTPVerb.POST, 'api/v3/community/transfer', form)
    }
    
    updateTotp(form: UpdateTotp): Promise<UpdateTotpResponse> {
        return this.call <UpdateTotpResponse, UpdateTotp> (HTTPVerb.POST, 'api/v3/user/totp/update', form)
    }

    async uploadImage({ image }: UploadImage): Promise<UploadImageResponse> {
        const pictrsEndpoint = this.baseURL + '/pictrs/image'

        const imageData = new FormData();
        imageData.append("images[]", new Blob([image]), "dummy.png")
    
        const response = await this.fetchFunction(pictrsEndpoint, {
          method: 'POST',
          body: imageData,
          headers: this.headers,
        });
    
        if (response.status === 413) {
            return { msg: "Image is too large" };
        }
    
        if (!response.ok) {
            return { msg: `Upload Error: ${(await response.json()).msg}`}
        }

        const responseJson = await response.json();
    
        let url: string | undefined = undefined;
        let delete_url: string | undefined = undefined;

        if (responseJson.msg === "ok") {
          const { file: hash, delete_token: deleteToken } = responseJson.files[0];
          delete_url = `${pictrsEndpoint}/delete/${deleteToken}/${hash}`;
          url = `${pictrsEndpoint}/${hash}`;
        }
    
        return { ...responseJson, url, delete_url, };
    }

    validateAuth(): Promise<SuccessResponse> {
        return this.call <SuccessResponse> (HTTPVerb.GET, 'api/v3/user/validate_auth')
    }

    verifyEmail(form: VerifyEmail): Promise<SuccessResponse> {
        return this.call <SuccessResponse, VerifyEmail> (HTTPVerb.POST, 'api/v3/user/verify_email', form)
    }


}