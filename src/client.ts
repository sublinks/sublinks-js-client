import { HeadersObject } from './types/HeadersObject'
import { HttpClientConstructorOptions } from './types/HttpClientConstructorOptions'

//export type HTTPVerb = 'GET' | 'POST' | 'PUT' | 'OPTIONS' | 'DELETE' | 'PATCH'
enum HTTPVerb {
    GET,
    POST,
    PUT,
    OPTIONS,
    DELETE,
    PATCH
}
import { fetch } from 'cross-fetch'

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




// Import Native Types
import type { CacheOptions } from './types/argumentTypes/CacheOptions'
import type { StatusResponse } from './types/StatusResponse'
import type { SublinksClientCache } from './types/SublinksClientCache'

import { FetchCache } from './cache'
import { LemmyHttp } from 'lemmy-js-client'
import { SublinksHttp } from './native-client'



/**
 * Universal Sublinks/Lemmy client that works with both APIs
*/
export class SublinksClient {
    baseURL: string             // Base URL of the API (https://instance.example.com)
    instance: string
    native: SublinksHttp        // Native HTTP client
    lemmy: LemmyHttp            // Lemmy HTTP client for legacy API calls
    headers: HeadersObject      // Key-value object store for HTTP headers the client will send to the API server.
    cache: FetchCache           
    fetchFunction = fetch

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
        
        this.lemmy      = new LemmyHttp(this.baseURL, options);
        this.native     = new SublinksHttp(this.baseURL, options)
        this.cache      = new FetchCache(options?.cacheTime ?? 60, options?.useCache ?? true)
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

    // Native Method Wrappers
    /** Fetches and returns the version of the native API */
    apiVersion(): Promise<StatusResponse> {
        return this.native.apiVersion();
    }


    // Lemmy API Compatibility Wrappers

    addAdmin(form: AddAdmin): Promise<AddAdminResponse>  {
        return this.call<AddAdminResponse, AddAdmin>(HTTPVerb.POST, 'api/v3/admin/add', form)
    }

    addModToCommunity(form: AddModToCommunity): Promise<AddModToCommunityResponse> {
        return this.call<AddModToCommunityResponse, AddModToCommunity> (HTTPVerb.POST, 'api/v3/community/mod', form)
    }

    approveRegistrationApplication(form: ApproveRegistrationApplication): Promise<RegistrationApplicationResponse> {
        return this.call<RegistrationApplicationResponse, ApproveRegistrationApplication>( HTTPVerb.PUT, 'api/v3/admin/registration_application/approve', form)
    }

    banFromCommunity(form: BanFromCommunity): Promise<BanFromCommunityResponse> {
        return this.call<BanFromCommunityResponse, BanFromCommunity> (HTTPVerb.POST, 'api/v3/community/ban_user', form)
    }

    banPerson(form: BanPerson): Promise<BanPersonResponse> {
        return this.call<BanPersonResponse, BanPerson> (HTTPVerb.POST, 'api/v3/user/ban', form)
    }

    blockCommunity(form: BlockCommunity): Promise<BlockCommunityResponse> {
        return this.call<BlockCommunityResponse, BlockCommunity> (HTTPVerb.POST, 'api/v3/community/block', form)
    }
    
    blockInstance(form: BlockInstance): Promise<BlockInstanceResponse> {
        return this.call<BlockInstanceResponse,BlockInstance> (HTTPVerb.POST, 'api/v3/site/block', form)
    }

    blockPerson(form: BlockPerson): Promise<BlockPersonResponse> {
        return this.call<BlockPersonResponse, BlockPerson> (HTTPVerb.POST, 'api/v3/user/block', form)
    }
    
    changePassword(form: ChangePassword): Promise<LoginResponse> {
        return this.call<LoginResponse, ChangePassword> (HTTPVerb.PUT, 'api/v3/user/change_password', form)
    }

    createComment(form: CreateComment): Promise<CommentResponse> {
        return this.call<CommentResponse, CreateComment> (HTTPVerb.POST, 'api/v3/comment', form)
    }

    createCommentReport(form: CreateCommentReport): Promise<CommentReportResponse> {
        return this.call<CommentReportResponse, CreateCommentReport> (HTTPVerb.POST, 'api/v3/comment/report', form)
    }

    createCommunity(form: CreateCommunity): Promise<CommunityResponse> {
        return this.call<CommunityResponse, CreateCommunity> (HTTPVerb.POST, 'api/v3/community', form)
    }

    createCustomEmoji(form: CreateCustomEmoji): Promise<CustomEmojiResponse> {
        return this.call<CustomEmojiResponse, CreateCustomEmoji> (HTTPVerb.POST, 'api/v3/custom_emoji', form)
    }
    
    createPost(form: CreatePost): Promise<PostResponse> {
        return this.call<PostResponse, CreatePost> (HTTPVerb.POST, 'api/v3/post', form)
    }

    createPostReport(form: CreatePostReport): Promise<PostReportResponse> {
        return this.call<PostReportResponse, CreatePostReport> (HTTPVerb.POST, 'api/v3/post/report', form)
    }

    createPrivateMessage(form: CreatePrivateMessage): Promise<PrivateMessageResponse> {
        return this.call<PrivateMessageResponse, CreatePrivateMessage> (HTTPVerb.POST, 'api/v3/private_message', form)
    }

    createPrivateMessageReport(form: CreatePrivateMessageReport): Promise<PrivateMessageReportResponse> {
        return this.call<PrivateMessageReportResponse, CreatePrivateMessageReport> (HTTPVerb.POST, 'api/v3/private_message/report', form)
    }

    createSite(form: CreateSite): Promise<SiteResponse> {
        return this.call<SiteResponse, CreateSite> (HTTPVerb.POST, 'api/v3/site', form)
    }

    deleteAccount(form: DeleteAccount): Promise<SuccessResponse> {
        return this.call<SuccessResponse, DeleteAccount> (HTTPVerb.POST, 'api/v3/user/delete_account', form)
    }

    deleteComment(form: DeleteComment): Promise<CommentResponse> {
        return this.call<CommentResponse, DeleteComment> (HTTPVerb.POST, 'api/v3/comment/delete', form)
    }

    deleteCommunity(form: DeleteCommunity): Promise<CommunityResponse> {
        return this.call<CommunityResponse, DeleteCommunity> (HTTPVerb.POST, 'api/v3/community/delete', form)
    }

    deleteCustomEmoji(form: DeleteCustomEmoji): Promise<SuccessResponse> {
        return this.call<SuccessResponse, DeleteCustomEmoji> (HTTPVerb.POST, 'api/v3/custom_emoji/delete', form)
    }

    // This *should* work, but the way the Lemmy devs aren't even bothering to handle this internally is stupid.
    deleteImage({ token, filename }: DeleteImage): Promise<boolean> {
        return this.call<boolean, DeleteImage> (HTTPVerb.GET, `pictrs/delete/${token}/${filename}`)
    }

    deletePost(form: DeletePost): Promise<PostResponse> {
        return this.call<PostResponse, DeletePost> (HTTPVerb.POST, 'api/v3/post/delete', form)
    }

    deletePrivateMessage(form: DeletePrivateMessage): Promise<PrivateMessageResponse> {
        return this.call<PrivateMessageResponse, DeletePrivateMessage> (HTTPVerb.POST, 'api/v3/private_message/delete', form)
    }
    
    distinguishComment(form: DistinguishComment): Promise<CommentResponse> {
        return this.call<CommentResponse, DistinguishComment> (HTTPVerb.POST, 'api/v3/comment/distinguish', form)
    }

    editComment(form: EditComment): Promise<CommentResponse> {
        return this.call<CommentResponse, EditComment> (HTTPVerb.PUT, 'api/v3/comment', form)
    }

    editCommunity(form: EditCommunity): Promise<CommunityResponse> {
        return this.call<CommunityResponse, EditCommunity> (HTTPVerb.PUT, 'api/v3/community', form)
    }

    editCustomEmoji(form: EditCustomEmoji): Promise<CustomEmojiResponse> {
        return this.call<CustomEmojiResponse, EditCustomEmoji> (HTTPVerb.PUT,'api/v3/custom_emoji', form)
    }

    editPost(form: EditPost): Promise<PostResponse> {
        return this.call<PostResponse, EditPost> (HTTPVerb.PUT, 'api/v3/post', form)
    }

    editPrivateMessage(form: EditPrivateMessage): Promise<PrivateMessageResponse> {
        return this.call<PrivateMessageResponse, EditPrivateMessage> (HTTPVerb.PUT, 'api/v3/private_message', form)
    }

    editSite(form: EditSite): Promise<SiteResponse> {
        return this.call<SiteResponse, EditSite> (HTTPVerb.PUT, 'api/v3/site', form)
    }

    exportSettings():Promise<string> {
        return this.call<string> (HTTPVerb.GET, 'api/v3/user/export_settings')
    }
    
    featurePost(form: FeaturePost): Promise<PostResponse> {
        return this.call<PostResponse, FeaturePost> (HTTPVerb.POST, 'api/v3/post/feature', form)
    }

    followCommunity(form: FollowCommunity):Promise<CommunityResponse> {
        return this.call<CommunityResponse, FollowCommunity> (HTTPVerb.POST, 'api/v3/community/follow', form)
    }

    generateTotpSecret(): Promise<GenerateTotpSecretResponse> {
        return this.call<GenerateTotpSecretResponse> (HTTPVerb.POST, 'api/v3/user/totp/generate')
    }
    
    getBannedPersons(): Promise<BannedPersonsResponse> {
        return this.call<BannedPersonsResponse> (HTTPVerb.GET, 'api/v3/user/banned')
    }

    getCaptcha(): Promise<GetCaptchaResponse> {
        return this.call<GetCaptchaResponse> (HTTPVerb.GET, 'api/v3/user/get_captcha')
    }

    getComment(form: GetComment): Promise<CommentResponse> {
        return this.call<CommentResponse, GetComment> (HTTPVerb.GET, 'api/v3/comment', form)
    }

    getComments(form: GetComments = {}): Promise<GetCommentsResponse> {
        return this.call<GetCommentsResponse, GetComments> (HTTPVerb.GET, 'api/v3/comment/list', form)
    }
    
    async getCommunity(form: GetCommunity = {}, cacheOptions?: CacheOptions):Promise<GetCommunityResponse> {
        if (!form.id && !form.name) return {} as GetCommunityResponse

        const cacheKey = form.id ? `getCommunity_id_${form.id.toString()}` : `getCommunity_name_${form.name}`
        return this.cache.get<GetCommunityResponse>(cacheKey, cacheOptions) 
            ?? this.cache.put<GetCommunityResponse>(cacheKey, await this.call<GetCommunityResponse, GetCommunity> (HTTPVerb.GET, 'api/v3/community', form), cacheOptions)
    }

    async getFederatedInstances(cacheOptions?: CacheOptions): Promise<GetFederatedInstancesResponse> {
        const cacheKey = "getFederatedInstances"
        
        return this.cache.get<GetFederatedInstancesResponse>(cacheKey, cacheOptions) 
            ?? this.cache.put<GetFederatedInstancesResponse>(cacheKey, await this.call<GetFederatedInstancesResponse> (HTTPVerb.GET, 'api/v3/federated_instances'), cacheOptions)
    }

    async getModlog(form: GetModlog = {}, cacheOptions?: CacheOptions): Promise<GetModlogResponse> {
        let cacheKey = 'getModlog'
        
        if (form.mod_person_id)     cacheKey += `_mod_person_id_${form.mod_person_id.toString()}`
        if (form.community_id)      cacheKey += `_community_id_${form.community_id.toString()}`
        if (form.page)              cacheKey += `_page_${form.page.toString()}`
        if (form.limit)             cacheKey += `_limit_${form.limit.toString()}`
        if (form.type_)             cacheKey += `_type_${form.type_}`
        if (form.other_person_id)   cacheKey += `_other_person_id_${form.other_person_id.toString()}`
        
        // These are new in 0.19.4
        //if (form.post_id)           cacheKey += `_post_id_${form.post_id.toString()}`
        //if (form.comment_id)        cacheKey += `_comment_id_${form.comment_id.toString()}`
        
        return this.cache.get<GetModlogResponse>(cacheKey, cacheOptions) 
            ?? this.cache.put<GetModlogResponse>(cacheKey, await this.call<GetModlogResponse, GetModlog> (HTTPVerb.GET, 'api/v3/modlog', form), cacheOptions)
        
    }

    async getPersonDetails(form: GetPersonDetails = {}, cacheOptions?: CacheOptions): Promise<GetPersonDetailsResponse> {
        let cacheKey = 'getPersonDetails'

        if (form.person_id)         cacheKey += `_person_id_${form.person_id.toString()}`
        if (form.username)          cacheKey += `_username_${form.username}`
        if (form.sort)              cacheKey += `_sort_${form.sort}`
        if (form.page)              cacheKey += `_page_${form.page.toString()}`
        if (form.limit)             cacheKey += `_limit_${form.limit.toString()}`
        if (form.community_id)      cacheKey += `_community_id_${form.community_id.toString()}`
        if (form.saved_only)        cacheKey += `_saved_only`
                
        return this.cache.get<GetPersonDetailsResponse>(cacheKey, cacheOptions) 
            ?? this.cache.put<GetPersonDetailsResponse>(cacheKey, await this.call<GetPersonDetailsResponse, GetPersonDetails> (HTTPVerb.GET, 'api/v3/user', form), cacheOptions)
    }

    getPersonMentions(form: GetPersonMentions): Promise<GetPersonMentionsResponse> {
        return this.call<GetPersonMentionsResponse, GetPersonMentions> (HTTPVerb.GET, 'api/v3/user/mention', form)
    }

    getPost(form: GetPost = {}): Promise<GetPostResponse> {
        return this.call<GetPostResponse, GetPost> (HTTPVerb.GET, 'api/v3/post', form)
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
            ?? this.cache.put<GetSiteResponse>('getSite', await this.call<GetSiteResponse>(HTTPVerb.GET, 'api/v3/site'), cacheOptions)
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