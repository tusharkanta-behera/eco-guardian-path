import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { CheckCircle, Download, Play, Award } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import api from '@/api/axios';

interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
}

interface TrainingModuleProps {
  trainingId: string;
}

const TrainingModule: React.FC<TrainingModuleProps> = ({ trainingId }) => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [training, setTraining] = useState<any>(null);
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [isVideoWatched, setIsVideoWatched] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Sample questions - in real app, these would come from the API
  const questions: Question[] = [
    {
      id: 'q1',
      question: 'What is the most important step in waste segregation?',
      options: [
        'Separating wet and dry waste at source',
        'Mixing all waste together',
        'Throwing everything in one bin',
        'Burning waste materials'
      ],
      correctAnswer: 0
    },
    {
      id: 'q2',
      question: 'Which material is considered hazardous waste?',
      options: [
        'Banana peels',
        'Newspaper',
        'Used batteries',
        'Cardboard boxes'
      ],
      correctAnswer: 2
    },
    {
      id: 'q3',
      question: 'How often should you clean your recycling bins?',
      options: [
        'Never',
        'Once a year',
        'Weekly or when dirty',
        'Only when they smell'
      ],
      correctAnswer: 2
    }
  ];

  useEffect(() => {
    loadTrainingData();
    loadProgress();
  }, [trainingId]);

  const loadTrainingData = async () => {
    try {
      // In real app, fetch from API
      // const response = await api.get(`/trainings/${trainingId}`);
      // setTraining(response.data);
      
      // Mock data for demo
      setTraining({
        id: trainingId,
        title: 'Waste Segregation Best Practices',
        description: 'Learn the fundamentals of proper waste segregation for a cleaner environment.',
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        content: 'Proper waste segregation is crucial for environmental sustainability. This training will teach you how to separate different types of waste effectively.',
        duration: 15 // minutes
      });
    } catch (error) {
      console.error('Failed to load training:', error);
      toast({
        title: 'Error',
        description: 'Failed to load training module.',
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const loadProgress = () => {
    const savedProgress = localStorage.getItem(`trainingProgress:${trainingId}`);
    if (savedProgress) {
      const progressData = JSON.parse(savedProgress);
      setProgress(progressData.percent || 0);
      setAnswers(progressData.answers || {});
      setIsVideoWatched(progressData.videoWatched || false);
      setCurrentStep(progressData.step || 0);
    }
  };

  const saveProgress = async (newProgress: number, newAnswers: Record<string, number> = answers, step: number = currentStep) => {
    const progressData = {
      percent: newProgress,
      answers: newAnswers,
      videoWatched: isVideoWatched || step > 0,
      step,
      updatedAt: new Date().toISOString()
    };

    // Save to localStorage
    localStorage.setItem(`trainingProgress:${trainingId}`, JSON.stringify(progressData));

    // Sync to backend
    try {
      await api.post(`/trainings/${trainingId}/progress`, {
        userId: 'current-user-id', // Would come from auth context
        percent: newProgress,
        answers: newAnswers
      });
    } catch (error) {
      console.error('Failed to sync progress to backend:', error);
    }
  };

  const handleVideoComplete = () => {
    setIsVideoWatched(true);
    const newProgress = 25;
    setProgress(newProgress);
    setCurrentStep(1);
    saveProgress(newProgress, answers, 1);
    
    toast({
      title: 'Video Completed!',
      description: 'You can now proceed to the quiz.',
    });
  };

  const handleAnswerChange = (questionId: string, answerIndex: number) => {
    const newAnswers = { ...answers, [questionId]: answerIndex };
    setAnswers(newAnswers);
    
    // Calculate progress based on answered questions
    const answeredCount = Object.keys(newAnswers).length;
    const quizProgress = (answeredCount / questions.length) * 50; // Quiz is worth 50%
    const totalProgress = 25 + quizProgress; // 25% for video + quiz progress
    
    setProgress(totalProgress);
    saveProgress(totalProgress, newAnswers, currentStep);
  };

  const handleSubmitQuiz = async () => {
    setIsSubmitting(true);
    
    try {
      // Calculate score
      let correctAnswers = 0;
      questions.forEach(question => {
        if (answers[question.id] === question.correctAnswer) {
          correctAnswers++;
        }
      });
      
      const score = (correctAnswers / questions.length) * 100;
      const finalProgress = score >= 70 ? 100 : 75; // Pass if 70% or higher
      
      setProgress(finalProgress);
      setCurrentStep(2);
      await saveProgress(finalProgress, answers, 2);
      
      if (score >= 70) {
        toast({
          title: 'Congratulations!',
          description: `You passed with ${score.toFixed(0)}%! Your certificate is ready for download.`,
        });
      } else {
        toast({
          title: 'Quiz Completed',
          description: `You scored ${score.toFixed(0)}%. You need 70% to pass. Please review and retake.`,
          variant: 'destructive'
        });
      }
    } catch (error) {
      console.error('Failed to submit quiz:', error);
      toast({
        title: 'Error',
        description: 'Failed to submit quiz. Please try again.',
        variant: 'destructive'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDownloadCertificate = async () => {
    try {
      // In real app, this would download from API
      // const response = await api.get(`/trainings/${trainingId}/certificate`, { responseType: 'blob' });
      
      toast({
        title: 'Certificate Downloaded',
        description: 'Your certificate has been downloaded successfully!',
      });
    } catch (error) {
      console.error('Failed to download certificate:', error);
      toast({
        title: 'Error',
        description: 'Failed to download certificate.',
        variant: 'destructive'
      });
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="progress-ring"></div>
      </div>
    );
  }

  if (!training) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-2">Training Not Found</h2>
          <p className="text-muted-foreground">The requested training module could not be loaded.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">{training.title}</h1>
        <p className="text-muted-foreground text-lg">{training.description}</p>
        
        {/* Progress Bar */}
        <div className="mt-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium">Progress</span>
            <span className="text-sm text-muted-foreground">{progress.toFixed(0)}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
      </div>

      {/* Video Section */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Play className="w-5 h-5" />
            Training Video
          </CardTitle>
          <CardDescription>
            Watch the complete video to unlock the quiz section.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="aspect-video bg-muted rounded-lg mb-4 flex items-center justify-center">
            {/* In real app, embed actual video */}
            <div className="text-center">
              <Play className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
              <p className="text-muted-foreground">Video Player Placeholder</p>
              <p className="text-sm text-muted-foreground mt-2">Duration: {training.duration} minutes</p>
            </div>
          </div>
          
          {!isVideoWatched && (
            <Button onClick={handleVideoComplete} variant="default" className="w-full">
              Mark as Watched
            </Button>
          )}
          
          {isVideoWatched && (
            <div className="flex items-center gap-2 text-success">
              <CheckCircle className="w-5 h-5" />
              <span>Video completed</span>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Content Section */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Training Content</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-foreground leading-relaxed">{training.content}</p>
        </CardContent>
      </Card>

      {/* Quiz Section */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="w-5 h-5" />
            Knowledge Quiz
          </CardTitle>
          <CardDescription>
            Answer all questions to complete the training. You need 70% to pass.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {!isVideoWatched ? (
            <div className="text-center py-8 text-muted-foreground">
              <p>Complete the video first to unlock the quiz.</p>
            </div>
          ) : (
            <div className="space-y-6">
              {questions.map((question, index) => (
                <div key={question.id} className="space-y-3">
                  <h4 className="font-medium">
                    {index + 1}. {question.question}
                  </h4>
                  <RadioGroup
                    value={answers[question.id]?.toString() || ''}
                    onValueChange={(value) => handleAnswerChange(question.id, parseInt(value))}
                  >
                    {question.options.map((option, optionIndex) => (
                      <div key={optionIndex} className="flex items-center space-x-2">
                        <RadioGroupItem value={optionIndex.toString()} id={`${question.id}-${optionIndex}`} />
                        <Label htmlFor={`${question.id}-${optionIndex}`} className="text-sm">
                          {option}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>
              ))}
              
              <Button
                onClick={handleSubmitQuiz}
                disabled={Object.keys(answers).length < questions.length || isSubmitting}
                className="w-full mt-6"
                variant="default"
              >
                {isSubmitting ? 'Submitting...' : 'Submit Quiz'}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Certificate Section */}
      {progress >= 100 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-success">
              <Award className="w-5 h-5" />
              Congratulations!
            </CardTitle>
            <CardDescription>
              You have successfully completed the training. Download your certificate below.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={handleDownloadCertificate} variant="default" className="w-full">
              <Download className="w-4 h-4 mr-2" />
              Download Certificate
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default TrainingModule;