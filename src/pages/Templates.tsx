import React from 'react';
import { useStore } from '../store';
import { Link } from 'react-router-dom';
import { FileText, ArrowLeft, Copy } from 'lucide-react';

const Templates: React.FC = () => {
  const { templates } = useStore();

  const handleUseTemplate = (content: string) => {
    window.location.href = `/?content=${encodeURIComponent(content)}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <header className="mb-8">
          <Link
            to="/"
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-4 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>返回</span>
          </Link>
          <div className="flex items-center gap-3 mb-2">
            <FileText className="w-10 h-10 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-800">短信模板</h1>
          </div>
          <p className="text-gray-600">点击模板即可使用</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {templates.map((template) => (
            <div
              key={template.id}
              className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all"
            >
              <h3 className="text-lg font-semibold text-gray-800 mb-4">{template.name}</h3>
              <p className="text-gray-600 mb-6 line-clamp-4">{template.content}</p>
              <button
                onClick={() => handleUseTemplate(template.content)}
                className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 px-4 rounded-xl font-medium flex items-center justify-center gap-2 hover:from-blue-600 hover:to-blue-700 transition-all"
              >
                <Copy className="w-4 h-4" />
                使用模板
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Templates;
