import React, { useState, useEffect } from 'react';
import { useStore } from '../store';
import { Link, useSearchParams } from 'react-router-dom';
import { MessageSquare, Send, FileText, Share2, Check } from 'lucide-react';

const Home: React.FC = () => {
  const [searchParams] = useSearchParams();
  const { templates } = useStore();
  const [phone, setPhone] = useState('');
  const [content, setContent] = useState('');
  const [showShareModal, setShowShareModal] = useState(false);
  const [shareLink, setShareLink] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const paramPhone = searchParams.get('phone') || '';
    const paramContent = searchParams.get('content') || '';
    
    if (paramPhone || paramContent) {
      setPhone(paramPhone);
      setContent(paramContent);
    }
  }, [searchParams]);

  const handleShare = () => {
    const baseUrl = window.location.origin + window.location.pathname;
    const params = new URLSearchParams();
    if (phone) params.set('phone', phone);
    if (content) params.set('content', content);
    const link = `${baseUrl}?${params.toString()}`;
    setShareLink(link);
    setShowShareModal(true);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareLink).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleSend = () => {
    if (!phone) {
      alert('请输入收件人号码');
      return;
    }
    if (!content) {
      alert('请输入短信内容');
      return;
    }
    const smsUrl = `sms:${encodeURIComponent(phone)}?body=${encodeURIComponent(content)}`;
    window.location.href = smsUrl;
  };

  const charCount = content.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 md:p-8">
      <div className="max-w-2xl mx-auto">
        <header className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <MessageSquare className="w-10 h-10 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-800">短信编辑器</h1>
          </div>
          <p className="text-gray-600">快速编辑短信，一键发送到手机</p>
        </header>

        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-6">
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              收件人号码
            </label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="请输入手机号码"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              短信内容
            </label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="请输入短信内容..."
              rows={8}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
            />
            <div className="flex justify-end mt-2">
              <span className={`text-sm ${charCount > 70 ? 'text-orange-500' : 'text-gray-500'}`}>
                {charCount} 字
              </span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={handleSend}
              className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 text-white py-4 px-6 rounded-xl font-semibold flex items-center justify-center gap-2 hover:from-blue-600 hover:to-blue-700 transition-all shadow-lg hover:shadow-xl active:scale-95"
            >
              <Send className="w-5 h-5" />
              发送短信
            </button>
            <button
              onClick={handleShare}
              className="flex-1 bg-gradient-to-r from-green-500 to-green-600 text-white py-4 px-6 rounded-xl font-semibold flex items-center justify-center gap-2 hover:from-green-600 hover:to-green-700 transition-all shadow-lg hover:shadow-xl active:scale-95"
            >
              <Share2 className="w-5 h-5" />
              分享链接
            </button>
          </div>
        </div>

        <Link
          to="/templates"
          className="block bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <FileText className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-800">短信模板</h2>
              <p className="text-gray-600">查看和管理常用短信模板</p>
            </div>
            <div className="ml-auto text-blue-600">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </Link>

        {showShareModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl p-6 w-full max-w-lg">
              <h3 className="text-xl font-bold text-gray-800 mb-4">分享链接</h3>
              <p className="text-gray-600 mb-4">
                把这个链接分享给他人，他们打开后就能看到您编辑好的短信内容，一键发送！
              </p>
              <div className="bg-gray-50 rounded-xl p-4 mb-4">
                <p className="text-sm text-gray-500 break-all">{shareLink}</p>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowShareModal(false)}
                  className="flex-1 py-3 px-4 border border-gray-300 rounded-xl font-medium text-gray-600 hover:bg-gray-50 transition-all"
                >
                  关闭
                </button>
                <button
                  onClick={handleCopyLink}
                  className="flex-1 py-3 px-4 bg-green-500 text-white rounded-xl font-medium hover:bg-green-600 transition-all flex items-center justify-center gap-2"
                >
                  {copied ? <Check className="w-5 h-5" /> : <Share2 className="w-5 h-5" />}
                  {copied ? '已复制！' : '复制链接'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
