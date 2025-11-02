        const _0x44fbfc=_0x5951;(function(_0x41efb0,_0x22907b){const _0x15613b=_0x5951,_0x20ec07=_0x41efb0();while(!![]){try{const _0x321b9c=-parseInt(_0x15613b(0x111))/0x1+-parseInt(_0x15613b(0x10c))/0x2+-parseInt(_0x15613b(0x10f))/0x3*(-parseInt(_0x15613b(0x10b))/0x4)+-parseInt(_0x15613b(0x112))/0x5*(-parseInt(_0x15613b(0x115))/0x6)+-parseInt(_0x15613b(0x10d))/0x7+-parseInt(_0x15613b(0x114))/0x8+parseInt(_0x15613b(0x10e))/0x9;if(_0x321b9c===_0x22907b)break;else _0x20ec07['push'](_0x20ec07['shift']());}catch(_0x395615){_0x20ec07['push'](_0x20ec07['shift']());}}}(_0x3dda,0x583dd));function _0x5951(_0x47f62b,_0x58ac21){const _0x3ddac9=_0x3dda();return _0x5951=function(_0x595162,_0x6f683){_0x595162=_0x595162-0x10a;let _0x109d48=_0x3ddac9[_0x595162];return _0x109d48;},_0x5951(_0x47f62b,_0x58ac21);}const API_KEY=_0x44fbfc(0x113),BASE_URL=_0x44fbfc(0x10a),VIDEO_URL=_0x44fbfc(0x110);function _0x3dda(){const _0x177dfd=['712104wXKaJD','855066iDdOCO','3640252KuXBWk','14033799fEqsIc','6HjrfZq','https://api.pexels.com/videos','474089iJBHtW','167425oGCcDl','LH59shPdj1xO0lolnHPsClH23qsnHE4NjkCFBhKEXvR0CbqwkrXbqBnw','2397544kRknjY','30iaeyJX','https://api.pexels.com/v1'];_0x3dda=function(){return _0x177dfd;};return _0x3dda();}
        
        // State aplikasi
        let currentPage = 1;
        let totalResults = 0;
        let currentQuery = 'women';
        let currentType = 'photos';
        let currentOrientation = '';
        let currentSize = '';
        let currentColor = '';
        let currentSort = 'popular';
        
        // Elemen DOM
        const searchInput = document.getElementById('search-input');
        const searchBtn = document.getElementById('search-btn');
        const searchTypeBtns = document.querySelectorAll('.search-type-btn');
        const orientationSelect = document.getElementById('orientation');
        const sizeSelect = document.getElementById('size');
        const colorSelect = document.getElementById('color');
        const sortSelect = document.getElementById('sort');
        const resultsGrid = document.getElementById('results-grid');
        const resultsTitle = document.getElementById('results-title');
        const resultsCount = document.getElementById('results-count');
        const pagination = document.getElementById('pagination');
        const loading = document.getElementById('loading');
        const errorMessage = document.getElementById('error-message');
        const modal = document.getElementById('modal');
        const modalImage = document.getElementById('modal-image');
        const modalVideo = document.getElementById('modal-video');
        const modalInfo = document.getElementById('modal-info');
        const modalClose = document.getElementById('modal-close');
        
        // Event Listeners
        document.addEventListener('DOMContentLoaded', () => {
            // Muat hasil default saat halaman dimuat
            performSearch();
            
            // Event listener untuk tombol pencarian
            searchBtn.addEventListener('click', () => {
                currentPage = 1;
                performSearch();
            });
            
            // Event listener untuk input pencarian (Enter key)
            searchInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    currentPage = 1;
                    performSearch();
                }
            });
            
            // Event listener untuk tombol jenis pencarian (gambar/video)
            searchTypeBtns.forEach(btn => {
                btn.addEventListener('click', () => {
                    searchTypeBtns.forEach(b => b.classList.remove('active'));
                    btn.classList.add('active');
                    currentType = btn.dataset.type;
                    currentPage = 1;
                    updateResultsTitle();
                    performSearch();
                });
            });
            
            // Event listener untuk filter
            orientationSelect.addEventListener('change', () => {
                currentOrientation = orientationSelect.value;
                currentPage = 1;
                performSearch();
            });
            
            sizeSelect.addEventListener('change', () => {
                currentSize = sizeSelect.value;
                currentPage = 1;
                performSearch();
            });
            
            colorSelect.addEventListener('change', () => {
                currentColor = colorSelect.value;
                currentPage = 1;
                performSearch();
            });
            
            sortSelect.addEventListener('change', () => {
                currentSort = sortSelect.value;
                currentPage = 1;
                performSearch();
            });
            
            // Event listener untuk modal
            modalClose.addEventListener('click', () => {
                modal.style.display = 'none';
            });
            
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    modal.style.display = 'none';
                }
            });
        });
        
        // Fungsi untuk melakukan pencarian
        async function performSearch() {
            // Tampilkan loading
            loading.style.display = 'block';
            errorMessage.style.display = 'none';
            resultsGrid.innerHTML = '';
            
            // Dapatkan query pencarian
            const query = searchInput.value.trim() || 'women';
            currentQuery = query;
            
            try {
                let response;
                
                if (currentType === 'photos') {
                    // Pencarian gambar
                    let url = `${BASE_URL}/search?query=${encodeURIComponent(query)}&page=${currentPage}&per_page=15`;
                    
                    // Tambahkan filter
                    if (currentOrientation) url += `&orientation=${currentOrientation}`;
                    if (currentColor) url += `&color=${currentColor}`;
                    if (currentSize) url += `&size=${currentSize}`;
                    
                    // Tambahkan sorting
                    if (currentSort === 'latest') {
                        url = `${BASE_URL}/curated?page=${currentPage}&per_page=15`;
                    } else {
                        url += `&sort=${currentSort}`;
                    }
                    
                    response = await fetch(url, {
                        headers: {
                            'Authorization': API_KEY
                        }
                    });
                } else {
                    // Pencarian video
                    let url = `${VIDEO_URL}/search?query=${encodeURIComponent(query)}&page=${currentPage}&per_page=15`;
                    
                    // Tambahkan filter
                    if (currentOrientation) url += `&orientation=${currentOrientation}`;
                    
                    response = await fetch(url, {
                        headers: {
                            'Authorization': API_KEY
                        }
                    });
                }
                
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                
                const data = await response.json();
                
                // Update state
                totalResults = data.total_results || 0;
                
                // Update UI
                updateResultsCount();
                displayResults(data);
                updatePagination();
                
            } catch (error) {
                console.error('Error fetching data:', error);
                errorMessage.textContent = `Terjadi kesalahan: ${error.message}`;
                errorMessage.style.display = 'block';
            } finally {
                loading.style.display = 'none';
            }
        }
        
        // Fungsi untuk menampilkan hasil pencarian
        function displayResults(data) {
            resultsGrid.innerHTML = '';
            
            if (currentType === 'photos') {
                // Tampilkan gambar
                data.photos.forEach(photo => {
                    const item = document.createElement('div');
                    item.className = 'result-item';
                    
                    item.innerHTML = `
                        <img src="${photo.src.medium}" alt="${photo.photographer}" class="result-image">
                        <div class="result-info">
                            <div class="result-title">Oleh: ${photo.photographer}</div>
                            <div class="result-meta">
                                <span>${photo.width} x ${photo.height}</span>
                                <span>ID: ${photo.id}</span>
                            </div>
                        </div>
                    `;
                    
                    item.addEventListener('click', () => openModal(photo));
                    resultsGrid.appendChild(item);
                });
            } else {
                // Tampilkan video
                data.videos.forEach(video => {
                    const item = document.createElement('div');
                    item.className = 'result-item';
                    
                    // Gunakan thumbnail video
                    const thumbnail = video.video_pictures[0]?.picture || '';
                    
                    item.innerHTML = `
                        <img src="${thumbnail}" alt="${video.user.name}" class="result-image">
                        <div class="result-info">
                            <div class="result-title">${video.user.name}</div>
                            <div class="result-meta">
                                <span>Durasi: ${formatDuration(video.duration)}</span>
                                <span>ID: ${video.id}</span>
                            </div>
                        </div>
                    `;
                    
                    item.addEventListener('click', () => openModal(video));
                    resultsGrid.appendChild(item);
                });
            }
        }
        
        // Fungsi untuk membuka modal dengan detail item
        function openModal(item) {
            if (currentType === 'photos') {
                // Modal untuk gambar
                modalImage.src = item.src.large;
                modalImage.style.display = 'block';
                modalVideo.style.display = 'none';
                
                modalInfo.innerHTML = `
                    <h3>Detail Gambar</h3>
                    <p><strong>Fotografer:</strong> ${item.photographer}</p>
                    <p><strong>URL Fotografer:</strong> <a href="${item.photographer_url}" target="_blank">${item.photographer_url}</a></p>
                    <p><strong>Dimensi:</strong> ${item.width} x ${item.height}</p>
                    <p><strong>Warna:</strong> <span style="background-color:${item.avg_color}; padding: 2px 8px; border-radius: 4px;">${item.avg_color}</span></p>
                    <p><a href="${item.url}" target="_blank">Lihat di Pexels</a></p>
                `;
            } else {
                // Modal untuk video
                modalImage.style.display = 'none';
                modalVideo.style.display = 'block';
                
                // Gunakan video dengan kualitas tertinggi yang tersedia
                const videoFile = item.video_files.reduce((prev, current) => 
                    (prev.width > current.width) ? prev : current
                );
                
                modalVideo.src = videoFile.link;
                
                modalInfo.innerHTML = `
                    <h3>Detail Video</h3>
                    <p><strong>Pembuat:</strong> ${item.user.name}</p>
                    <p><strong>Durasi:</strong> ${formatDuration(item.duration)}</p>
                    <p><strong>Dimensi:</strong> ${videoFile.width} x ${videoFile.height}</p>
                    <p><strong>Kualitas:</strong> ${videoFile.quality}</p>
                    <p><a href="${item.url}" target="_blank">Lihat di Pexels</a></p>
                `;
            }
            
            modal.style.display = 'flex';
        }
        
        // Fungsi untuk memperbarui judul hasil
        function updateResultsTitle() {
            resultsTitle.textContent = currentType === 'photos' ? 'Gambar Wanita' : 'Video Wanita';
        }
        
        // Fungsi untuk memperbarui jumlah hasil
        function updateResultsCount() {
            resultsCount.textContent = `${totalResults.toLocaleString()} hasil ditemukan`;
        }
        
        // Fungsi untuk memperbarui pagination
        function updatePagination() {
            pagination.innerHTML = '';
            
            const totalPages = Math.ceil(totalResults / 15);
            const maxPagesToShow = 5;
            
            // Tombol sebelumnya
            if (currentPage > 1) {
                const prevBtn = document.createElement('button');
                prevBtn.textContent = 'Sebelumnya';
                prevBtn.addEventListener('click', () => {
                    currentPage--;
                    performSearch();
                });
                pagination.appendChild(prevBtn);
            }
            
            // Tombol halaman
            let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
            let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);
            
            if (endPage - startPage + 1 < maxPagesToShow) {
                startPage = Math.max(1, endPage - maxPagesToShow + 1);
            }
            
            for (let i = startPage; i <= endPage; i++) {
                const pageBtn = document.createElement('button');
                pageBtn.textContent = i;
                if (i === currentPage) {
                    pageBtn.classList.add('active');
                }
                pageBtn.addEventListener('click', () => {
                    currentPage = i;
                    performSearch();
                });
                pagination.appendChild(pageBtn);
            }
            
            // Tombol berikutnya
            if (currentPage < totalPages) {
                const nextBtn = document.createElement('button');
                nextBtn.textContent = 'Berikutnya';
                nextBtn.addEventListener('click', () => {
                    currentPage++;
                    performSearch();
                });
                pagination.appendChild(nextBtn);
            }
        }
        
        // Fungsi utilitas untuk memformat durasi video
        function formatDuration(seconds) {
            const mins = Math.floor(seconds / 60);
            const secs = seconds % 60;
            return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
        }
