const InstagramViewedPostsManager = (() => {

    const DB_NAME = 'InstagramViewedPosts';

    const SCROLL_THRESHOLD = 500;
    const USER_PROFILE = window.location.pathname.split('/')[1];

    let db: IDBDatabase;

    function initDB(): void {
        const request: IDBOpenDBRequest = indexedDB.open(DB_NAME, 1);

        request.onupgradeneeded = function (event: IDBVersionChangeEvent): void {
            db = (event.target as IDBOpenDBRequest).result;
            db.createObjectStore('data', {keyPath: 'key'});
        };

        request.onsuccess = function (event: Event): void {
            db = (event.target as IDBOpenDBRequest).result;
            detectPosts();
        };

        request.onerror = function (event: Event): void {
            console.error(`Error opening IndexedDB:`, event);
        };
    }

    function addViewedButtonIfNotExists(post: Element): void {
        const postCode: string = post.getAttribute('href')!.split('/')[2];
        if (!postCode || post.querySelector('button')) {
            return;
        }

        const btn: HTMLButtonElement = document.createElement('button');
        btn.innerText = 'Viewed';
        btn.style.position = 'absolute';
        btn.style.top = '10px';
        btn.style.right = '10px';
        btn.style.zIndex = '9999';
        btn.style.pointerEvents = 'auto';

        btn.setAttribute('data-code', postCode);

        btn.onclick = function (event: Event): void {
            event.stopPropagation();
            event.preventDefault();

            isPostsViewed(postCode).then((viewed: boolean) => {
                if (viewed) {
                    removePostAsViewed(postCode);
                } else {
                    savePostAsViewed(postCode);
                }
            })
        };

        post.appendChild(btn);
    }

    function isPostsViewed(postCode: string): Promise<boolean> {
        return new Promise((resolve, reject) => {
            const store: IDBObjectStore = db.transaction(['data']).objectStore('data');
            const request: IDBRequest = store.get(`${USER_PROFILE}/${postCode}`);

            request.onsuccess = function (): void {
                resolve(!!(request.result && request.result.viewed));
            };

            request.onerror = function (): void {
                reject(new Error(`Failed to retrieve post ${postCode}`));
            };
        });
    }

    function savePostAsViewed(postCode: string): void {
        const store: IDBObjectStore = db.transaction(['data'], "readwrite").objectStore('data');
        store.put({key: `${USER_PROFILE}/${postCode}`, viewed: true});

        applyVisualEffectsOnPost(postCode);
    }

    function removePostAsViewed(postCode: string): void {
        const store: IDBObjectStore = db.transaction(['data'], "readwrite").objectStore('data');
        store.delete(`${USER_PROFILE}/${postCode}`);

        applyVisualEffectsOnPost(postCode);
    }

    function applyVisualEffectsOnPost(postCode: string): void {
        isPostsViewed(postCode).then((viewed: boolean) => {
            const imageElement = document.querySelector(`a[href='/p/${postCode}/']`) as HTMLElement
                || document.querySelector(`a[href='/reel/${postCode}/']`) as HTMLElement;

            if (imageElement && imageElement.style) {
                imageElement.style.opacity = viewed ? '0.5' : '1.0';
            }

            const buttonElement = document.querySelector(`button[data-code='${postCode}']`) as HTMLButtonElement;
            if (buttonElement) {
                buttonElement.innerText = viewed ? 'Remove' : 'Viewed';
            }
        })
    }

    function initializeObserver(): void {
        const observer: MutationObserver = new MutationObserver((_: MutationRecord[], observer: MutationObserver) => {
            const splashScreen: HTMLElement | null = document.getElementById('splash-screen');

            if (splashScreen && getComputedStyle(splashScreen).display === 'none') {
                observer.disconnect();

                detectPosts();
            }
        });

        observer.observe(document.body, {childList: true, subtree: true});
    }

    function detectPosts(): void {
        const posts: NodeListOf<Element> = document.querySelectorAll('div._aabd._aa8k._al3l > a');
        posts.forEach(post => {
            addViewedButtonIfNotExists(post);

            const attributes = post.getAttribute('href')!.split('/');
            if (attributes && attributes.length >= 2) {
                applyVisualEffectsOnPost(attributes[2]);
            }
        });
    }

    function onScroll(): void {
        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - SCROLL_THRESHOLD) {
            detectPosts();
        }
    }

    document.addEventListener('scroll', onScroll);

    return {
        initialize: () => {
            initializeObserver();
            initDB();
        }
    };

})();

InstagramViewedPostsManager.initialize();
