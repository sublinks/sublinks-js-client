import { HeadersObject } from './types/HeadersObject'
import { HttpClientConstructorOptions } from './types/HttpClientConstructorOptions'
import { CacheOptions } from './types/argumentTypes/CacheOptions'
import { FetchCache } from './cache'
//import { fetch } from 'cross-fetch'

enum HTTP {
    GET,
    POST,
    PUT,
    OPTIONS,
    DELETE,
    PATCH
}


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




/**
 * Universal Sublinks/Lemmy client that works with both APIs
*/
export class SublinksClient {
    baseURL: string             // Base URL of the API (https://instance.example.com)
    instance: string            // Instance base domain (instance.example.com)
    headers: HeadersObject      // Key-value object store for HTTP headers the client will send to the API server.
    cache: FetchCache           // A Key-Value cache store to hold API getter results
    compatible18: boolean       // Compatibility option to send `auth` in form responses for 0.18.x compatibility
    fetchFunction = fetch       // Allows overriding native fetch with something like cross-fetch

    /** 
     * Client library for Sublinks and, during compatibility phase, Lemmy.
     * 
     * @param instance should be the domain of the instance without the scheme (e.g. sublinks.example.com).  HTTPS is assumed and enforced by the library.
     * @param options is an object of type HttpClientConstructorOptions
    */
    constructor( instance: string, options?: HttpClientConstructorOptions) {
        this.instance = instance
        
        // Strip scheme and anything except the hostname if provided
        if (instance.startsWith('https://') || instance.startsWith('http://')) {
            this.instance = new URL(instance).host;
        }
        
        let scheme        = options?.insecure ? 'http://' : 'https://'
        this.headers      = options?.headers || {}
        this.baseURL      = `${scheme}${this.instance}`
        this.cache        = new FetchCache(options?.cacheTime ?? 60, options?.useCache ?? true)
        this.compatible18 = options?.compatible18 ?? false
        
        if (options?.fetchFunction) this.fetchFunction = options.fetchFunction
    }

    /** Standard fetch wrapper for native API calls. 
    
    * ResponseType is the type definition to expect from the response. 
     
    * FormDataType is the type definition for the `form` parameter data
    
    * Note:  These are reversed from how Lemmy's wrapper function is implemented to allow shorter invocations for GET requests by not requiring a dummy 
             'object' type be passed for the non-existent form data when not needed.
     
    * 
    * @param method    HTTP method to use for the call
    * @param endpoint  The relative API endpoint (e.g. /siteinfo -> https://{instance.com}/sublinks-api/v2/siteinfo)
    * @param form      The optional body payload for non-GET requests or key/values for GET query string params
    */
    async call <ResponseType, FormDataType extends object = object> (method: HTTP, endpoint: string, form: FormDataType = {} as FormDataType): Promise<ResponseType> {
        const url = new URL(this.baseURL);
        url.pathname = endpoint;
        
        let response: Response 
        let json: any
        
        // Compatibility shim for 0.18.x since it requires the auth token be provided in the form data.
        if (this.compatible18 && this.headers['Authorization']?.includes('Bearer ')) {
            //@ts-ignore since `auth` is not defined in any of the current Lemmy types anymore
            form.auth = this.headers['Authorization'].replace('Bearer ', '')
        }

        try {
            if (method == HTTP.GET) {
                const keys = Object.keys(form);

                keys.forEach((key:string) => {
                    let value = (form as any)[key] as string;
                    url.searchParams.set(key, value)
                })
                
                response = await this.fetchFunction(url, {
                    method: HTTP[method],
                    headers: this.headers,
                });
            }
            else {
                response = await this.fetchFunction(url, {
                    method: HTTP[method],
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
        return this.call <AddAdminResponse, AddAdmin>(HTTP.POST, 'api/v3/admin/add', form)
    }

    addModToCommunity(form: AddModToCommunity): Promise<AddModToCommunityResponse> {
        return this.call <AddModToCommunityResponse, AddModToCommunity> (HTTP.POST, 'api/v3/community/mod', form)
    }

    approveRegistrationApplication(form: ApproveRegistrationApplication): Promise<RegistrationApplicationResponse> {
        return this.call <RegistrationApplicationResponse, ApproveRegistrationApplication> (HTTP.PUT, 'api/v3/admin/registration_application/approve', form)
    }

    banFromCommunity(form: BanFromCommunity): Promise<BanFromCommunityResponse> {
        return this.call <BanFromCommunityResponse, BanFromCommunity> (HTTP.POST, 'api/v3/community/ban_user', form)
    }

    banPerson(form: BanPerson): Promise<BanPersonResponse> {
        return this.call <BanPersonResponse, BanPerson> (HTTP.POST, 'api/v3/user/ban', form)
    }

    blockCommunity(form: BlockCommunity): Promise<BlockCommunityResponse> {
        return this.call <BlockCommunityResponse, BlockCommunity> (HTTP.POST, 'api/v3/community/block', form)
    }
    
    blockInstance(form: BlockInstance): Promise<BlockInstanceResponse> {
        return this.call <BlockInstanceResponse,BlockInstance> (HTTP.POST, 'api/v3/site/block', form)
    }

    blockPerson(form: BlockPerson): Promise<BlockPersonResponse> {
        return this.call <BlockPersonResponse, BlockPerson> (HTTP.POST, 'api/v3/user/block', form)
    }
    
    changePassword(form: ChangePassword): Promise<LoginResponse> {
        return this.call <LoginResponse, ChangePassword> (HTTP.PUT, 'api/v3/user/change_password', form)
    }

    createComment(form: CreateComment): Promise<CommentResponse> {
        return this.call <CommentResponse, CreateComment> (HTTP.POST, 'api/v3/comment', form)
    }

    createCommentReport(form: CreateCommentReport): Promise<CommentReportResponse> {
        return this.call <CommentReportResponse, CreateCommentReport> (HTTP.POST, 'api/v3/comment/report', form)
    }

    createCommunity(form: CreateCommunity): Promise<CommunityResponse> {
        return this.call <CommunityResponse, CreateCommunity> (HTTP.POST, 'api/v3/community', form)
    }

    createCustomEmoji(form: CreateCustomEmoji): Promise<CustomEmojiResponse> {
        return this.call <CustomEmojiResponse, CreateCustomEmoji> (HTTP.POST, 'api/v3/custom_emoji', form)
    }
    
    createPost(form: CreatePost): Promise<PostResponse> {
        return this.call <PostResponse, CreatePost> (HTTP.POST, 'api/v3/post', form)
    }

    createPostReport(form: CreatePostReport): Promise<PostReportResponse> {
        return this.call <PostReportResponse, CreatePostReport> (HTTP.POST, 'api/v3/post/report', form)
    }

    createPrivateMessage(form: CreatePrivateMessage): Promise<PrivateMessageResponse> {
        return this.call <PrivateMessageResponse, CreatePrivateMessage> (HTTP.POST, 'api/v3/private_message', form)
    }

    createPrivateMessageReport(form: CreatePrivateMessageReport): Promise<PrivateMessageReportResponse> {
        return this.call <PrivateMessageReportResponse, CreatePrivateMessageReport> (HTTP.POST, 'api/v3/private_message/report', form)
    }

    createSite(form: CreateSite): Promise<SiteResponse> {
        return this.call <SiteResponse, CreateSite> (HTTP.POST, 'api/v3/site', form)
    }

    deleteAccount(form: DeleteAccount): Promise<SuccessResponse> {
        return this.call <SuccessResponse, DeleteAccount> (HTTP.POST, 'api/v3/user/delete_account', form)
    }

    deleteComment(form: DeleteComment): Promise<CommentResponse> {
        return this.call <CommentResponse, DeleteComment> (HTTP.POST, 'api/v3/comment/delete', form)
    }

    deleteCommunity(form: DeleteCommunity): Promise<CommunityResponse> {
        return this.call <CommunityResponse, DeleteCommunity> (HTTP.POST, 'api/v3/community/delete', form)
    }

    deleteCustomEmoji(form: DeleteCustomEmoji): Promise<SuccessResponse> {
        return this.call <SuccessResponse, DeleteCustomEmoji> (HTTP.POST, 'api/v3/custom_emoji/delete', form)
    }

    // This *should* work, but the way the Lemmy devs aren't even bothering to handle this internally is stupid.
    deleteImage({ token, filename }: DeleteImage): Promise<boolean> {
        return this.call <boolean, DeleteImage> (HTTP.GET, `pictrs/delete/${token}/${filename}`)
    }

    deletePost(form: DeletePost): Promise<PostResponse> {
        return this.call <PostResponse, DeletePost> (HTTP.POST, 'api/v3/post/delete', form)
    }

    deletePrivateMessage(form: DeletePrivateMessage): Promise<PrivateMessageResponse> {
        return this.call <PrivateMessageResponse, DeletePrivateMessage> (HTTP.POST, 'api/v3/private_message/delete', form)
    }
    
    distinguishComment(form: DistinguishComment): Promise<CommentResponse> {
        return this.call <CommentResponse, DistinguishComment> (HTTP.POST, 'api/v3/comment/distinguish', form)
    }

    editComment(form: EditComment): Promise<CommentResponse> {
        return this.call <CommentResponse, EditComment> (HTTP.PUT, 'api/v3/comment', form)
    }

    editCommunity(form: EditCommunity): Promise<CommunityResponse> {
        return this.call <CommunityResponse, EditCommunity> (HTTP.PUT, 'api/v3/community', form)
    }

    editCustomEmoji(form: EditCustomEmoji): Promise<CustomEmojiResponse> {
        return this.call <CustomEmojiResponse, EditCustomEmoji> (HTTP.PUT,'api/v3/custom_emoji', form)
    }

    editPost(form: EditPost): Promise<PostResponse> {
        return this.call <PostResponse, EditPost> (HTTP.PUT, 'api/v3/post', form)
    }

    editPrivateMessage(form: EditPrivateMessage): Promise<PrivateMessageResponse> {
        return this.call <PrivateMessageResponse, EditPrivateMessage> (HTTP.PUT, 'api/v3/private_message', form)
    }

    editSite(form: EditSite): Promise<SiteResponse> {
        return this.call <SiteResponse, EditSite> (HTTP.PUT, 'api/v3/site', form)
    }

    exportSettings():Promise<string> {
        return this.call <string> (HTTP.GET, 'api/v3/user/export_settings')
    }
    
    featurePost(form: FeaturePost): Promise<PostResponse> {
        return this.call <PostResponse, FeaturePost> (HTTP.POST, 'api/v3/post/feature', form)
    }

    followCommunity(form: FollowCommunity):Promise<CommunityResponse> {
        return this.call <CommunityResponse, FollowCommunity> (HTTP.POST, 'api/v3/community/follow', form)
    }

    generateTotpSecret(): Promise<GenerateTotpSecretResponse> {
        return this.call <GenerateTotpSecretResponse> (HTTP.POST, 'api/v3/user/totp/generate')
    }
    
    getBannedPersons(): Promise<BannedPersonsResponse> {
        return this.call <BannedPersonsResponse> (HTTP.GET, 'api/v3/user/banned')
    }

    getCaptcha(): Promise<GetCaptchaResponse> {
        return this.call <GetCaptchaResponse> (HTTP.GET, 'api/v3/user/get_captcha')
    }

    getComment(form: GetComment): Promise<CommentResponse> {
        return this.call <CommentResponse, GetComment> (HTTP.GET, 'api/v3/comment', form)
    }

    getComments(form: GetComments = {}): Promise<GetCommentsResponse> {
        return this.call <GetCommentsResponse, GetComments> (HTTP.GET, 'api/v3/comment/list', form)
    }
    
    async getCommunity(form: GetCommunity = {}, cacheOptions?: CacheOptions):Promise<GetCommunityResponse> {
        if (!form.id && !form.name) return {} as GetCommunityResponse

        const cacheKey = this.cache.cacheKey("getCommunity", form);
        return this.cache.get<GetCommunityResponse>(cacheKey, cacheOptions) 
            ?? this.cache.put<GetCommunityResponse>(cacheKey, await this.call <GetCommunityResponse, GetCommunity> (HTTP.GET, 'api/v3/community', form), cacheOptions)
    }

    async getFederatedInstances(cacheOptions?: CacheOptions): Promise<GetFederatedInstancesResponse> {
        const cacheKey = "getFederatedInstances"
        
        return this.cache.get<GetFederatedInstancesResponse>(cacheKey, cacheOptions) 
            ?? this.cache.put<GetFederatedInstancesResponse>(cacheKey, await this.call <GetFederatedInstancesResponse> (HTTP.GET, 'api/v3/federated_instances'), cacheOptions)
    }

    async getModlog(form: GetModlog = {}, cacheOptions?: CacheOptions): Promise<GetModlogResponse> {
        const cacheKey = this.cache.cacheKey("getModlog", form)

        return this.cache.get<GetModlogResponse>(cacheKey, cacheOptions) 
            ?? this.cache.put<GetModlogResponse>(cacheKey, await this.call <GetModlogResponse, GetModlog> (HTTP.GET, 'api/v3/modlog', form), cacheOptions)
        
    }

    async getPersonDetails(form: GetPersonDetails = {}, cacheOptions?: CacheOptions): Promise<GetPersonDetailsResponse> {
        const cacheKey = this.cache.cacheKey("getPersonDetails", form)

        return this.cache.get<GetPersonDetailsResponse>(cacheKey, cacheOptions) 
            ?? this.cache.put<GetPersonDetailsResponse>(cacheKey, await this.call <GetPersonDetailsResponse, GetPersonDetails> (HTTP.GET, 'api/v3/user', form), cacheOptions)
    }

    getPersonMentions(form: GetPersonMentions): Promise<GetPersonMentionsResponse> {
        return this.call <GetPersonMentionsResponse, GetPersonMentions> (HTTP.GET, 'api/v3/user/mention', form)
    }

    getPost(form: GetPost = {}): Promise<GetPostResponse> {
        return this.call <GetPostResponse, GetPost> (HTTP.GET, 'api/v3/post', form)
    }

    getPosts(form: GetPosts = {}): Promise<GetPostsResponse> {
        return this.call <GetPostsResponse, GetPosts> (HTTP.GET, 'api/v3/post/list', form)
    }

    getPrivateMessages(form: GetPrivateMessages): Promise<PrivateMessagesResponse> {
        return this.call <PrivateMessagesResponse, GetPrivateMessages> (HTTP.GET, 'api/v3/private_message/list', form)
    }

    getReplies(form: GetReplies): Promise<GetRepliesResponse> {
        return this.call <GetRepliesResponse, GetReplies> (HTTP.GET, 'api/v3/user/replies', form)
    }

    getReportCount(form: GetReportCount): Promise<GetReportCountResponse> {
        return this.call <GetReportCountResponse, GetReportCount> (HTTP.GET, 'api/v3/user/report_count', form)
    }

    /** Gets the site info and optionally caches it. 
     * @param options   Options to control the cache behavior
    **/
    async getSite(cacheOptions?: CacheOptions): Promise<GetSiteResponse> {
        return this.cache.get<GetSiteResponse>('getSite', cacheOptions) 
            ?? this.cache.put<GetSiteResponse>('getSite', await this.call <GetSiteResponse>(HTTP.GET, 'api/v3/site'), cacheOptions)
    }

    getSiteMetadata(form: GetSiteMetadata): Promise<GetSiteMetadataResponse> {
        return this.call <GetSiteMetadataResponse, GetSiteMetadata> (HTTP.GET, 'api/v3/post/site_metadata', form)
    }

    getUnreadCount(): Promise<GetUnreadCountResponse> {
        return this.call <GetUnreadCountResponse> (HTTP.GET, 'api/v3/user/unread_count')
    }

    getUnreadRegistrationApplicationCount(): Promise<GetUnreadRegistrationApplicationCountResponse> {
        return this.call <GetUnreadRegistrationApplicationCountResponse> (HTTP.GET, 'api/v3/admin/registration_application/count')
    }

    hideCommunity(form: HideCommunity): Promise <SuccessResponse> {
        return this.call <SuccessResponse, HideCommunity> (HTTP.PUT, 'api/v3/community/hide', form)
    }
    
    importSettings(form: any): Promise<SuccessResponse> {
        return this.call <SuccessResponse, any> (HTTP.POST, 'api/v3/user/import_settings', form)
    }

    leaveAdmin(): Promise<GetSiteResponse> {
        return this.call <GetSiteResponse> (HTTP.POST, 'api/v3/user/leave_admin')
    }
    
    likeComment(form: CreateCommentLike): Promise<CommentResponse> {
        return this.call <CommentResponse, CreateCommentLike> (HTTP.POST, 'api/v3/comment/like', form)
    }

    likePost(form: CreatePostLike): Promise<PostResponse> {
        return this.call <PostResponse, CreatePostLike> (HTTP.POST, 'api/v3/post/like', form)
    }

    listCommentLikes(form: ListCommentLikes): Promise<ListCommentLikesResponse> {
        return this.call <ListCommentLikesResponse, ListCommentLikes> (HTTP.GET, 'api/v3/like', form)
    }
    
    listCommentReports(form: ListCommentReports): Promise<ListCommentReportsResponse> {
        return this.call <ListCommentReportsResponse, ListCommentReports> (HTTP.GET, 'api/v3/comment/report/list', form)
    }

    listCommunities(form: ListCommunities = {}): Promise<ListCommunitiesResponse> {
        return this.call <ListCommunitiesResponse, ListCommunities> (HTTP.GET, 'api/v3/community/list', form)
    }
    
    listLogins(): Promise<LoginToken[]> {
        return this.call <LoginToken[]> (HTTP.GET, 'api/v3/user/list_logins')
    }

    listPostLikes(form: ListPostLikes): Promise<ListPostLikesResponse> {
        return this.call <ListPostLikesResponse, ListPostLikes> (HTTP.GET, 'api/v3/post/like', form)
    }

    listPostReports(form: ListPostReports): Promise<ListPostReportsResponse> {
        return this.call <ListPostReportsResponse, ListPostReports> (HTTP.GET, 'api/v3/post/report/list', form)
    }

    listPrivateMessageReports(form: ListPrivateMessageReports): Promise<ListPrivateMessageReportsResponse> {
        return this.call <ListPrivateMessageReportsResponse, ListPrivateMessageReports> (HTTP.GET, 'api/v3/private_message/report/list', form)
    }

    listRegistrationApplications(form: ListRegistrationApplications): Promise<ListRegistrationApplicationsResponse> {
        return this.call <ListRegistrationApplicationsResponse, ListRegistrationApplications> (HTTP.GET, 'api/v3/admin/registration_application/list', form)
    }

    lockPost(form: LockPost): Promise<PostResponse> {
        return this.call <PostResponse, LockPost> (HTTP.POST, 'api/v3/post/lock', form)
    }

    login(form: Login): Promise<LoginResponse> {
        return this.call <LoginResponse, Login> (HTTP.POST, 'api/v3/user/login', form)
    }

    logout(): Promise<SuccessResponse> {
        return this.call <SuccessResponse> (HTTP.POST, 'api/v3/user/logout')
    }

    markAllAsRead(): Promise<GetRepliesResponse> {
        return this.call <GetRepliesResponse> (HTTP.POST, 'api/v3/user/mark_all_as_read')
    }
    
    markCommentReplyAsRead(form: MarkCommentReplyAsRead): Promise<CommentReplyResponse> {
        return this.call <CommentReplyResponse, MarkCommentReplyAsRead> (HTTP.POST, 'api/v3/comment/mark_as_read', form)
    }
    
    markPersonMentionAsRead(form: MarkPersonMentionAsRead): Promise<PersonMentionResponse> {
        return this.call <PersonMentionResponse, MarkPersonMentionAsRead> (HTTP.POST, 'api/v3/user/mention/mark_as_read', form)
    }
    
    markPostAsRead(form: MarkPostAsRead): Promise<SuccessResponse> {
        return this.call <SuccessResponse, MarkPostAsRead> (HTTP.POST, 'api/v3/post/mark_as_read', form)
    }

    markPrivateMessageAsRead(form: MarkPrivateMessageAsRead): Promise<PrivateMessageResponse> {
        return this.call <PrivateMessageResponse, MarkPrivateMessageAsRead> (HTTP.POST, 'api/v3/private_message/mark_as_read', form)
    }
    
    passwordChangeAfterReset(form: PasswordChangeAfterReset): Promise<SuccessResponse> {
        return this.call <SuccessResponse, PasswordChangeAfterReset> (HTTP.POST, 'api/v3/user/password_change', form)
    }
    
    passwordReset(form: PasswordReset): Promise<SuccessResponse> {
        return this.call <SuccessResponse, PasswordReset> (HTTP.POST, 'api/v3/user/password_reset', form)
    }

    purgeComment(form: PurgeComment): Promise<SuccessResponse> {
        return this.call <SuccessResponse, PurgeComment> (HTTP.POST, 'api/v3/admin/purge/comment', form)
    }

    purgeCommunity(form: PurgeCommunity): Promise<SuccessResponse> {
        return this.call <SuccessResponse, PurgeCommunity> (HTTP.POST, 'api/v3/admin/purge/community', form)
    }

    purgePerson(form: PurgePerson): Promise<SuccessResponse> {
        return this.call <SuccessResponse, PurgePerson> (HTTP.POST, 'api/v3/admin/purge/person', form)
    }

    purgePost(form: PurgePost): Promise<SuccessResponse> {
        return this.call <SuccessResponse, PurgePost> (HTTP.POST, 'api/v3/admin/purge/post', form)
    }

    register(form: Register): Promise<LoginResponse> {
        return this.call <LoginResponse, Register> (HTTP.POST, 'api/v3/user/register', form)
    }

    removeComment(form: RemoveComment): Promise<CommentResponse> {
        return this.call <CommentResponse, RemoveComment> (HTTP.POST, 'api/v3/comment/remove', form)
    }

    removeCommunity(form: RemoveCommunity): Promise<CommunityResponse> {
        return this.call <CommunityResponse, RemoveCommunity> (HTTP.POST, 'api/v3/community/remove', form)
    }
   
    removePost(form: RemovePost): Promise<PostResponse> {
        return this.call <PostResponse, RemovePost> (HTTP.POST, 'api/v3/post/remove', form)
    }

    resolveCommentReport(form: ResolveCommentReport): Promise<CommentReportResponse> {
        return this.call <CommentReportResponse, ResolveCommentReport> (HTTP.PUT, 'api/v3/comment/report/resolve', form)
    }

    resolveObject(form: ResolveObject): Promise<ResolveObjectResponse> {
        return this.call <ResolveObjectResponse, ResolveObject> (HTTP.GET, 'api/v3/resolve_object', form)
    }

    resolvePostReport(form: ResolvePostReport): Promise<PostReportResponse> {
        return this.call <PostReportResponse, ResolvePostReport> (HTTP.PUT, 'api/v3/post/report/resolve', form)
    }

    resolvePrivateMessageReport(form: ResolvePrivateMessageReport): Promise<PrivateMessageReportResponse> {
        return this.call <PrivateMessageReportResponse, ResolvePrivateMessageReport> (HTTP.PUT, 'api/v3/private_message/report/resolve', form)
    }
    
    saveComment(form: SaveComment): Promise<CommentResponse> {
        return this.call <CommentResponse, SaveComment> (HTTP.PUT, 'api/v3/comment/save', form)
    }
    
    savePost(form: SavePost): Promise<PostResponse> {
        return this.call <PostResponse, SavePost> (HTTP.PUT, 'api/v3/post/save', form)
    }

    saveUserSettings(form: SaveUserSettings): Promise<SuccessResponse> {
        return this.call <SuccessResponse, SaveUserSettings> (HTTP.PUT, 'api/v3/user/save_user_settings', form)
    }

    search(form: Search): Promise<SearchResponse> {
        return this.call <SearchResponse, Search> (HTTP.GET, 'api/v3/search', form)
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
        return this.call <GetCommunityResponse, TransferCommunity> (HTTP.POST, 'api/v3/community/transfer', form)
    }
    
    updateTotp(form: UpdateTotp): Promise<UpdateTotpResponse> {
        return this.call <UpdateTotpResponse, UpdateTotp> (HTTP.POST, 'api/v3/user/totp/update', form)
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
        return this.call <SuccessResponse> (HTTP.GET, 'api/v3/user/validate_auth')
    }

    verifyEmail(form: VerifyEmail): Promise<SuccessResponse> {
        return this.call <SuccessResponse, VerifyEmail> (HTTP.POST, 'api/v3/user/verify_email', form)
    }


}