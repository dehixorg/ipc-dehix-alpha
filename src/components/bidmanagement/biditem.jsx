'use client';

import React, { useState, useEffect } from 'react';
import { axiosInstance } from '../../lib/axiosinstance';
import { Button } from '../../components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../../components/ui/card';
import { toast } from '../../components/ui/use-toast';

const BidItem = ({ bid, onAction, actions }) => {
  const [projectName, setProjectName] = useState('');
  const [bidderName, setBidderName] = useState('');
  const [buttonsVisible, setButtonsVisible] = useState(true);
  const { _id, current_price, project_id, bidder_id } = bid;
  const [statusMessage, setStatusMessage] = useState('');

  useEffect(() => {
    const fetchProjectName = async () => {
      try {
        const response = await axiosInstance.get(`/project/${project_id}`);
        const name = response.data.data.projectName;
        setProjectName(name);
      } catch (error) {
        toast({
          variant: 'destructive',
          title: 'Error',
          description: 'Something went wrong. Please try again.',
        });
        console.error('Error fetching project name:', error);
      }
    };

    fetchProjectName();
  }, [project_id]);

  useEffect(() => {
    const fetchBidderName = async () => {
      try {
        const response = await axiosInstance.get(`/freelancer/${bidder_id}`);
        const name = response.data.userName;
        setBidderName(name);
      } catch (error) {
        toast({
          variant: 'destructive',
          title: 'Error',
          description: 'Something went wrong. Please try again.',
        });
        console.error('Error fetching bidder name:', error);
      }
    };

    fetchBidderName();
  }, [bidder_id]);

  const handleActionClick = async (actionType) => {
    try {
      await onAction(_id, actionType);
      setStatusMessage(`Candidate ${actionType}ed`);
      setButtonsVisible(false);
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Something went wrong. Please try again.',
      });
      setStatusMessage(`Error performing ${actionType} action.`);
      console.error('Error updating bid status:', error);
    }
  };

  return (
    <Card className="p-4 mb-4 rounded-lg">
      <CardHeader>
        <CardTitle className="text-xl font-bold">
          Project: {projectName}
        </CardTitle>
        <CardDescription>Current Price: ${current_price}</CardDescription>
        <CardDescription>Bidder: {bidderName}</CardDescription>
      </CardHeader>
      <CardContent>
        {buttonsVisible && (
          <div className="actions mt-4">
            {actions.map((action) => (
              <Button
                key={action.type}
                className={`bg-${action.variant}-500 hover:bg-${action.variant}-600 text-white font-bold py-2 px-4 rounded mr-2`}
                onClick={() => handleActionClick(action.label)}
              >
                {action.label}
              </Button>
            ))}
          </div>
        )}
      </CardContent>
      {statusMessage && (
        <CardFooter>
          <p className="text-lg font-semibold text-green-400">
            {statusMessage}
          </p>
        </CardFooter>
      )}
    </Card>
  );
};

export default BidItem;
